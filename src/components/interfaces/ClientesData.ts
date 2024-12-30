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
  arquivos: {
    ano: Number;
    mes: string;
    enviado: Boolean;
    emailEnviado: String;
    link: string;
  }[];
  ativo: Boolean;
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
  arquivos: [],
  ativo: true,
};
