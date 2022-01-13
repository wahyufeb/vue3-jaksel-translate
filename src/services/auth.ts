import AxiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { IRegistrationPayload, ILoginPayload } from "@/types/payload";

export const registrationAPI = (
  payload: IRegistrationPayload
): Promise<AxiosResponse> => {
  return AxiosInstance.post("auth/registration", payload);
};

export const loginAPI = (payload: ILoginPayload): Promise<AxiosResponse> => {
  return AxiosInstance.post("auth/login", payload);
};

export const profileAPI = (): Promise<AxiosResponse> => {
  return AxiosInstance.get("auth/profile");
};
