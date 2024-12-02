import "./App.css";
import { Button } from "@mui/material";
import Modal from "./components/create-modal/modal";
import Card from "./components/card/card";
import { useState, useEffect } from "react";
import { useClientes } from "./components/hooks/useClientes";
import { IClienteData } from "./components/interfaces/ClientesData";

function App() {
  const { data: clientes } = useClientes();

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<IClienteData | null>(null);
  
  const abrirModal = (cliente: IClienteData) => {
    setClienteSelecionado(cliente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClienteSelecionado(null); // Limpar o cliente selecionado ao fechar o modal
  };

  return (
    <>
      {console.log(clientes)}
      <div id="barraInicial">
        <h2>Painel XML</h2>
        <Button variant="contained" onClick={() => abrirModal({} as IClienteData)}>
          Novo Cliente
        </Button>
        
        </div>
      <div className="cards">
        {clientes?.map((i) => {
          return (
            <Card
              key={i.id}
              nome={i.razao}
              cnpj={i.cnpj}
              contador={i.tiposArquivo[0].nome}
              click={() => abrirModal(i)}
            />
          );
        })}
      </div>
      {modalAberto && clienteSelecionado && (
        <Modal closeModal={fecharModal} cliente={clienteSelecionado} />
      )}
    </>
  );
}

export default App;
