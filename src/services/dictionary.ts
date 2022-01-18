import AxiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { IDeleteDictionaryPayload, ITranslatingPayload } from "@/types/payload";
import { IDictionary } from "@/types/dictionary";

export const translatingAPI = ({
  params,
  payload,
}: ITranslatingPayload): Promise<AxiosResponse> => {
  return AxiosInstance.get(`dictionary/${payload}/translating`, {
    params,
  });
};

export const loadDictionariesAPI = (): Promise<AxiosResponse> => {
  return AxiosInstance.get(`dictionary/`);
};

export const addDictionaryAPI = (
  payload: IDictionary
): Promise<AxiosResponse> => {
  return AxiosInstance.post(`dictionary/create`, payload);
};

export const updateDictionaryAPI = (
  payload: IDictionary
): Promise<AxiosResponse> => {
  return AxiosInstance.put(`dictionary/${payload._id}`);
};

export const deleteDictionaryAPI = (
  payload: IDeleteDictionaryPayload
): Promise<AxiosResponse> => {
  return AxiosInstance.delete(`dictionary/${payload.params._id}`);
};
