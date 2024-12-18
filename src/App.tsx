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

export const notify = (msg: string, tipo: TypeOptions) => {
  toast.info(msg, {
    type: tipo,
    position: "top-right",
    autoClose: 5000, // Fecha automaticamente após 5 segundos
    hideProgressBar: false, // Mostra a barra de progresso
    closeOnClick: true,
    pauseOnHover: true,
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

  return (
    <>
      <div className="body">
        <div className="titulo">
          <h2 className="painel">Painel XML</h2>
        </div>

        <div className="columns">
          <div className="menu">
            <div className="buttonNovoCliente">
              <Button
                variant="contained"
                onClick={() => abrirModal(InitCliente)}
              >
                Novo Cliente
              </Button>
            </div>
            {/* Filtros */}
            <div className="filtros">
              <SelectMonth value={mes} setValue={setMes} />
              <SelectYear value={ano} setValue={setAno} />
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

          <div className="bodyCards">
            <div className="cards">
              {data?.map((cliente) => {
                return (
                  <Card
                    key={cliente.id}
                    nome={cliente.fantasia}
                    cnpj={cliente.cnpj}
                    software={cliente.software}
                    click={() => abrirModal(cliente)}
                  />
                );
              })}
            </div>
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
    </>
  );
}

export default App;
