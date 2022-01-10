import axios, { AxiosRequestConfig, Method } from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../envs";

axios.interceptors.response.use(
  (response) => response,
  (error) => toast.error("Couldn't connect to the server, please try again later.")
);

export const config = (path: string, method: Method, data?: any) => {
  const config: AxiosRequestConfig = {
    url: `${apiBaseUrl}${path}`,
    method,
    data,
    timeout: 10000,
  };

  return config;
};
