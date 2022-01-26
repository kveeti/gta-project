import axios, { AxiosRequestConfig, Method } from "axios";
import { toast } from "react-toastify";
import { accessTokenHeaderName, apiBaseUrl } from "../envs";
import { getAccessToken, setAccessToken } from "./accessToken";

axios.interceptors.response.use(
  (response) => {
    const accessToken = response.headers[accessTokenHeaderName];
    if (accessToken) setAccessToken(accessToken);

    return Promise.resolve(response);
  },
  (error) => {
    if (!error.response || error.response.status >= 502)
      return toast.error("Failed connecting to the server, please try again later.");

    const statusCode = error?.response?.status;

    if (statusCode === 500) return toast.error("Server error, please try again later.");

    return Promise.reject(error);
  }
);

export const config = (path: string, method: Method, data?: any): AxiosRequestConfig => {
  return {
    url: `${apiBaseUrl}${path}`,
    method,
    data,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
};
