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
import { EnumFiltro } from "./utils/constantes";
import SelectMonth from "./components/selectMonth/SelectMonth";
import SelectYear from "./components/selectYear/SelectYear";
import SelectFilter from "./components/selectFilter/SelectFilter";

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
      <div id="barraInicial">
        <h2>Painel XML</h2>
        <Button variant="contained" onClick={() => abrirModal(InitCliente)}>
          Novo Cliente
        </Button>
      </div>
      <div>
        {/* Filtros */}
        <SelectMonth value={mes} setValue={setMes} />
        <SelectYear value={ano} setValue={setAno} />
        <SelectFilter value={filtro} setValue={setFiltro} />
        <Button variant="contained" onClick={filtrarPorData}>
          filtrar
        </Button>
      </div>
      <div>{`Exibindo ${data.length} registros`}</div>
      <div className="cards">
        {data?.map((cliente) => {
          return (
            <Card
              key={cliente.id}
              nome={cliente.razao}
              cnpj={cliente.cnpj}
              software={cliente.software}
              click={() => abrirModal(cliente)}
            />
          );
        })}
      </div>
      {modalAberto && clienteSelecionado && (
        <Modal
          closeModal={fecharModal}
          cliente={clienteSelecionado}
          cbAtualizarListagemClientes={atualizarDados}
        />
      )}
    </>
  );
}

export default App;
