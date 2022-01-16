import AxiosInstance from "@/utils/axios";
import { IAxiosHeaders } from "@/types/axiosHeader";
import CryptoJs from "crypto-js";
import { CRYPTO_KEY } from "@/config/environment";

export const setAxiosHeaders = (headers: IAxiosHeaders): void => {
  headers.forEach((header) => {
    AxiosInstance.defaults.headers.common[header.name] = header.value;
  });
};

export type SelftType<T> = T;
export const encryptCrypto = (data: SelftType<string>): string => {
  return CryptoJs.AES.encrypt(
    typeof data === "object" ? JSON.stringify(data) : data,
    CRYPTO_KEY
  ).toString();
};

export const decryptCrypto = (data: string): string => {
  const result = CryptoJs.AES.decrypt(data, CRYPTO_KEY).toString(
    CryptoJs.enc.Utf8
  );
  if (typeof data === "object") {
    return JSON.parse(result);
  }
  return result;
};
