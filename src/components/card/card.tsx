import "./card.css";

interface CardProps {
  nome: string;
  cnpj: string;
  contador: string;
  click(): void;
}

function Card({ nome, cnpj, contador, click }: CardProps) {
  return (
    <div className="card" id="card" onClick={click}>
      <h2>{nome}</h2>
      <h3>{cnpj}</h3>
      <h3>{contador}</h3>
    </div>
  );
}

export default Card;
