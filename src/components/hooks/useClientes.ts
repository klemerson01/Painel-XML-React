import { AxiosResponse, HttpStatusCode } from "axios";
import { API_URL } from "../../api/cliente";
import { IClienteData } from "../interfaces/ClientesData";
import { IApiResponse } from "../interfaces/ApiResponse";

export const fetchTodosClientes = async (): Promise<
  IApiResponse<IClienteData[]>
> => {
  return (await API_URL.get<IApiResponse<IClienteData[]>>("/clientes")).data;
};

export const fetchFiltroClientes = async (
  ano: Number,
  mes: string,
  gerado: boolean
): Promise<IApiResponse<IClienteData[]>> => {
  return (
    await API_URL.get<IApiResponse<IClienteData[]>>(`/clientes/${gerado}`, {
      params: {
        ano,
        mes,
      },
    })
  ).data;
};

export const CriarCliente = async (
  data: IClienteData
): Promise<AxiosResponse<IClienteData, any>> => {
  return await API_URL.post<IClienteData>(`/cliente`, {
    ...data,
  });
};

export const EditarCliente = async (
  data: IClienteData
): Promise<AxiosResponse<IClienteData, any>> => {
  return await API_URL.put<IClienteData>(`/cliente/${data.cnpj}`, {
    ...data,
  });
};

export interface IDTOUploadArquivo {
  cnpj: string;
  mes: string;
  ano: Number;
}

export interface RetornoUploadArquivo {
  status: Number;
  link: string;
}

export const uploadFileWithParams = async (
  file: any,
  params: IDTOUploadArquivo
): Promise<RetornoUploadArquivo> => {
  try {
    // Cria um objeto FormData
    const formData = new FormData();

    // Adiciona o arquivo ao FormData
    formData.append("file", file);

    formData.append("cnpj", params.cnpj);
    formData.append("mes", params.mes);
    formData.append("ano", params.ano.toString());

    // Realiza a requisição com axios
    const response = await API_URL.post("/cliente/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Define o cabeçalho apropriado
      },
    });

    // Retorna a resposta
    return {
      status: response.status,
      link: response.data.url,
    };
  } catch (error) {
    console.error("Erro ao realizar o upload:", error);
    throw error;
  }
};

export const EnviarEmail = async (
  id: string,
  ano: Number,
  mes: string
): Promise<HttpStatusCode> => {
  const res = await API_URL.post<IClienteData>(`/cliente/envio-email/${id}`, {
    ano,
    mes,
  });

  return res.status;
};
