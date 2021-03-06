import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/config/environment";
import { decryptCrypto } from "@/services/generic";
import Cookies from "js-cookie";

const AxiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const tokenCookie = Cookies.get("token");
if (tokenCookie) {
  AxiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${decryptCrypto(tokenCookie)}`;
}

export const cancelTokenSource = axios.CancelToken;
export default AxiosInstance;
