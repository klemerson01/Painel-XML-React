import {
  cnpjMask,
  cpfMask,
  getSoftwareImage,
  softwares,
} from "../../utils/constantes";
import "./card.css";

interface CardProps {
  nome: string;
  cnpj: string;
  software: string;
  ativo: Boolean;
  click(): void;
}

function Card({ nome, cnpj, software, ativo, click }: CardProps) {
  return (
    <div
      className={`card ${ativo ? "card-ativo" : "card-inativo"}`}
      onClick={click}
    >
      <div className="card-header">
        <h2>{nome.toUpperCase()}</h2>
        <h3>{cnpj.length === 11 ? cpfMask(cnpj) : cnpjMask(cnpj)}</h3>
      </div>
      <div className="card-body">
        <img
          src={getSoftwareImage(software) || "./public/placeholder.png"}
          alt={software}
        />
        <span className="software-label">{software.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default Card;
