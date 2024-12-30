import "./App.css";
import { Button } from "@mui/material";
import Modal from "./components/create-modal/modal";
import Card from "./components/card/card";
import { useState, useEffect } from "react";
import {
  fetchFiltroClientes,
  fetchTodosClientes,
} from "./components/hooks/useClientes";
import {
  IClienteData,
  InitCliente,
} from "./components/interfaces/ClientesData";
import { EnumFiltro, RetornarDescricaoMes } from "./utils/constantes";
import SelectMonth from "./components/selectMonth/SelectMonth";
import SelectYear from "./components/selectYear/SelectYear";
import SelectFilter from "./components/selectFilter/SelectFilter";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, TypeOptions, toast } from "react-toastify";
import SelectSoftware from "./components/selectSoftware/SelectSoftware";

export const notify = (msg: string, tipo: TypeOptions) => {
  toast.info(msg, {
    type: tipo,
    position: "top-right",
    autoClose: 2000, // Fecha automaticamente após 5 segundos
    hideProgressBar: false, // Mostra a barra de progresso
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });
};

function App() {
  // Bloco de States
  const [data, setData] = useState([] as IClienteData[]);
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<IClienteData | null>(null);
  const [mes, setMes] = useState("Janeiro");
  const [ano, setAno] = useState("2024");
  const [filtro, setFiltro] = useState(EnumFiltro.TODOS.toString());
  // Fim dos States

  // Bloco de Effects
  useEffect(() => {
    fetchTodosClientes().then((retorno) => {
      setData(retorno.data);
    });
    const now = new Date();
    setAno(now.getFullYear().toString());
    setMes(RetornarDescricaoMes(now.getMonth()));
  }, []);
  // Fim dos Effects

  const abrirModal = (cliente: IClienteData) => {
    setClienteSelecionado(cliente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClienteSelecionado(null);
  };

  const atualizarDados = (cliente: IClienteData) => {
    setData((prevClientes) => {
      const existe = prevClientes.find((item) => item.id === cliente.id);
      if (existe) {
        // Atualiza o cliente existente
        return prevClientes.map((item) =>
          item.id === cliente.id ? cliente : item
        );
      } else {
        // Adiciona um novo cliente
        return [...prevClientes, cliente];
      }
    });
  };

  const filtrarPorData = () => {
    if (filtro == EnumFiltro.TODOS) {
      fetchTodosClientes().then((retorno) => {
        setData(retorno.data);
      });
      return;
    }

    fetchFiltroClientes(Number(ano), mes, filtro == EnumFiltro.GERADOS).then(
      (res) => {
        setData(res.data);
      }
    );
  };

  const handleSearch = (value: string) => {
    if (value.length === 0) {
      fetchTodosClientes().then((retorno) => {
        setData(retorno.data);
      });
      return;
    }

    let clientesFiltrados = data.filter((cliente) =>
      cliente.fantasia.toLowerCase().includes(value.toLowerCase())
    );

    if (clientesFiltrados.length === 0) {
      clientesFiltrados = data.filter((cliente) =>
        cliente.cnpj.toLowerCase().includes(value.toLowerCase())
      );
    }
    setData(clientesFiltrados);
  };

  return (
    <>
      <div className="body">
        <div className="titulo">
          <p>Monitoramento de Clientes</p>
          <input
            type="text"
            placeholder="Pesquisar clientes..."
            className="input-pesquisa"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="menu">
          <div className="buttonNovoCliente">
            <Button variant="contained" onClick={() => abrirModal(InitCliente)}>
              Novo Cliente
            </Button>
          </div>
          {/* Filtros */}
          <div className="filtros">
            <SelectMonth
              value={mes}
              setValue={setMes}
              disabled={filtro == EnumFiltro.TODOS}
            />
            <SelectYear
              value={ano}
              setValue={setAno}
              disabled={filtro == EnumFiltro.TODOS}
            />
            <SelectFilter value={filtro} setValue={setFiltro} />
          </div>
          <div className="buttonFiltrar">
            <Button variant="contained" onClick={filtrarPorData}>
              filtrar
            </Button>
          </div>
          <div className="resultados">
            {`Exibindo ${data.length} registros`}{" "}
          </div>
        </div>
        <div className="columns">
          <div className="bodyCards">
            <div className="cards">
              {data?.map((cliente) => {
                return (
                  <Card
                    key={cliente.id}
                    nome={cliente.fantasia}
                    cnpj={cliente.cnpj}
                    software={cliente.software}
                    ativo={cliente.ativo}
                    click={() => abrirModal(cliente)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {modalAberto && clienteSelecionado && (
          <Modal
            closeModal={fecharModal}
            cliente={clienteSelecionado}
            cbAtualizarListagemClientes={atualizarDados}
          />
        )}

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
