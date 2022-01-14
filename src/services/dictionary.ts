import AxiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { ITranslatingPayload } from "@/types/payload";

export const translatingAPI = ({
  params,
  payload,
}: ITranslatingPayload): Promise<AxiosResponse> => {
  return AxiosInstance.get(`dictionary/${payload}/translating`, {
    params,
  });
};
