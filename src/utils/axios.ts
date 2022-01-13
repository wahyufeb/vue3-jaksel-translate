import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "@/config/environment";

const AxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
