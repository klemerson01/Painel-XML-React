export interface IClienteData {
  id?: string;
  razao: string;
  fantasia: string;
  cnpj: string;
  software: string;
  telefone: string;
  email: string;
  contador: {
    nome: string;
    email: string;
    telefone: string;
  };
  tiposArquivo: {
    sped: Boolean;
    spedFederal: Boolean;
    xml: Boolean;
    correcao: Boolean;
  };
}

export const InitCliente: IClienteData = {
  cnpj: "",
  razao: "",
  fantasia: "",
  software: "",
  email: "",
  telefone: "",
  contador: {
    nome: "",
    email: "",
    telefone: "",
  },
  tiposArquivo: {
    sped: false,
    spedFederal: false,
    xml: false,
    correcao: false,
  },
};
