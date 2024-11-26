export interface IClienteData {
  id: string;
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
  tiposArquivo: [
    {
      nome: string;
    }
  ];
}
