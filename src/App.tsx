import "./App.css";
import { Button } from "@mui/material";
import Modal from "./components/create-modal/modal";
import Card from "./components/card/card";
import { useState, useEffect } from "react";
import { useClientes } from "./components/hooks/useClientes";

function App() {
  const { data: clientes } = useClientes();

  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  return (
    <>
    {console.log(clientes)}
      <div id="barraInicial">
        <h2>Painel XML</h2>
        <Button variant="contained" onClick={abrirModal}>
          Novo Cliente
        </Button>
        {modalAberto && <Modal closeModal={fecharModal} />}
      </div>
      <div className="cards">
        {clientes?.map((i) => {
          return (
            <Card
              key={i.id}
              nome={i.razao}
              cnpj={i.cnpj}
              contador={i.tiposArquivo[0].nome}
              click={abrirModal}
            />
          );
        })}
        
        {/* <Card
            nome="Computek"
            cnpj="00.657.034/0001-53"
            contador="Paula"
            click={abrirModal}
          />
          <Card
            nome="Computek"
            cnpj="00.657.034/0001-53"
            contador="Paula"
            click={abrirModal}
          />
          <Card
            nome="Computek"
            cnpj="00.657.034/0001-53"
            contador="Paula"
            click={abrirModal}
          />
          <Card
            nome="Computek"
            cnpj="00.657.034/0001-53"
            contador="Paula"
            click={abrirModal}
          />
          <Card
            nome="Computek"
            cnpj="00.657.034/0001-53"
            contador="Paula"
            click={abrirModal}
          />
          <Card
            nome="Computek"
            cnpj="00.657.034/0001-53"
            contador="Paula"
            click={abrirModal}
          /> */}
      </div>
    </>
  );
}

export default App;
