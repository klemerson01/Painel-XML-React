import { AxiosResponse, HttpStatusCode } from "axios";
import { API_URL } from "../../api/cliente";
import { IClienteData } from "../interfaces/ClientesData";
import { IApiResponse } from "../interfaces/ApiResponse";
import { IResponseUpdload } from "../interfaces/ResponseUpload";
import { notify } from "../../App";

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
): Promise<IApiResponse<IClienteData>> => {
  return (
    await API_URL.post<IApiResponse<IClienteData>>(`/cliente`, {
      ...data,
    })
  ).data;
};

export const EditarCliente = async (
  data: IClienteData
): Promise<IApiResponse<IClienteData>> => {
  return (
    await API_URL.put<IApiResponse<IClienteData>>(`/cliente/${data.cnpj}`, {
      ...data,
    })
  ).data;
};

export interface IDTOUploadArquivo {
  mes: string;
  ano: Number;
}

export interface RetornoUploadArquivo {
  status: Number;
  link: string;
}

export const uploadFileWithParams = async (
  id: String,
  file: any,
  params: IDTOUploadArquivo
): Promise<IApiResponse<IResponseUpdload>> => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("mes", params.mes);
    formData.append("ano", params.ano.toString());

    const response: Promise<IApiResponse<IResponseUpdload>> = (
      await API_URL.post(`/cliente/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;

    return response;
  } catch (err: any) {
    if (err.response) {
      // Erros com resposta da API (status code fora do intervalo 2xx)
      const { status, data } = err.response;
      notify(
        `Erro ${status}: ${data.message || "Algo deu errado na API."}`,
        "error"
      );
    } else if (err.request) {
      // Erros relacionados à requisição (nenhuma resposta recebida)
      notify("Erro de rede: A API não respondeu.", "error");
    } else {
      // Outros erros (como problemas na configuração do Axios)
      notify(`Erro inesperado: ${err.message}`, "error");
    }
    return {
      status: HttpStatusCode.BadRequest,
      message: "Erro inesperado.",
      data: { url: "" },
      errors: [err.message],
    };
  }
};

export const EnviarEmail = async (
  id: string,
  ano: Number,
  mes: string
): Promise<IApiResponse<any>> => {
  const response = (
    await API_URL.post<IApiResponse<any>>(`/cliente/envio-email/${id}`, {
      ano,
      mes,
    })
  ).data;

  return response;
};
