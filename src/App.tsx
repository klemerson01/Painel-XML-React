import "./App.css";
import { Button } from "@mui/material";
import Modal from "./components/create-modal/modal";
import Card from "./components/card/card";
import { useState, useEffect } from "react";
import {
  fetchTodosClientes,
  useClientes,
} from "./components/hooks/useClientes";
import {
  IClienteData,
  InitCliente,
} from "./components/interfaces/ClientesData";

function App() {
  // Não entendi como funciona esse método
  //const { data: clientes } = useClientes();
  const [data, setData] = useState([] as IClienteData[]);
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<IClienteData | null>(null);

  useEffect(() => {
    fetchTodosClientes().then((retorno) => {
      setData(retorno.data);
    });
  }, []);

  const abrirModal = (cliente: IClienteData) => {
    setClienteSelecionado(cliente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClienteSelecionado(null); // Limpar o cliente selecionado ao fechar o modal
  };

  const atualizarDados = (cliente: IClienteData) => {
    console.log("Atualizando...");
    setData((prevClientes) => {
      const existe = prevClientes.find((item) => item.id === cliente.id);
      if (existe) {
        console.log("Atualizando existente...");
        // Atualiza o cliente existente
        return prevClientes.map((item) =>
          item.id === cliente.id ? cliente : item
        );
      } else {
        console.log("Atualizando novo...");
        // Adiciona um novo cliente
        return [...prevClientes, cliente];
      }
    });
  };

  return (
    <>
      <div id="barraInicial">
        <h2>Painel XML</h2>
        <Button variant="contained" onClick={() => abrirModal(InitCliente)}>
          Novo Cliente
        </Button>
      </div>
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
