import AxiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import {
  IDeleteDictionaryPayload,
  ITranslatingPayload,
  IUpdateDictionaryPayload,
} from "@/types/payload";
import { IDictionary } from "@/types/dictionary";

export const translatingAPI = ({
  params,
  payload,
  cancelToken,
}: ITranslatingPayload): Promise<AxiosResponse> => {
  return AxiosInstance.get(`dictionary/${payload}/translating`, {
    params,
    cancelToken,
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
  payload: IUpdateDictionaryPayload
): Promise<AxiosResponse> => {
  return AxiosInstance.put(`dictionary/${payload.params._id}`, payload.payload);
};

export const deleteDictionaryAPI = (
  payload: IDeleteDictionaryPayload
): Promise<AxiosResponse> => {
  return AxiosInstance.delete(`dictionary/${payload.params._id}`);
};
