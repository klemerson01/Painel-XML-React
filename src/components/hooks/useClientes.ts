import { AxiosResponse } from "axios";
import { API_URL } from "../../api/cliente";
import { IClienteData } from "../interfaces/ClientesData";

export const fetchTodosClientes = async (): Promise<
  AxiosResponse<IClienteData[], any>
> => {
  return await API_URL.get<IClienteData[]>("/clientes");
};

export const fetchFiltroClientes = async (
  ano: Number,
  mes: string,
  gerado: boolean
): Promise<AxiosResponse<IClienteData[], any>> => {
  return await API_URL.get<IClienteData[]>(`/clientes/${gerado}`, {
    params: {
      ano,
      mes,
    },
  });
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
