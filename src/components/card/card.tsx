import { cnpjMask } from "../../utils/constantes";
import "./card.css";

interface CardProps {
  nome: string;
  cnpj: string;
  software: string;
  click(): void;
}

function Card({ nome, cnpj, software, click }: CardProps) {
  return (
    <div className="card" id="card" onClick={click}>
      <h2>{nome.toUpperCase()} </h2>
      <h3>{cnpjMask(cnpj)}</h3>
      {/* <h3>{software}</h3> */}
      <img src="./public/varejofacil.png" width={"128px"} />
    </div>
  );
}

export default Card;
