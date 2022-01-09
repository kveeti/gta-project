import { AxiosRequestConfig, Method } from "axios";
import { apiBaseUrl, siteUrl } from "../../envs";

export const getNextAxiosConfig = (path: string, method: Method, body?: any) => {
  const config: AxiosRequestConfig = {
    url: `${siteUrl}/api${path}`,
    method: method,
    data: body,
    timeout: 10000,
  };

  return config;
};

export const getApiAxiosConfig = (path: string, method: Method, token: string, query: string) => {
  const config: AxiosRequestConfig = {
    url: `${apiBaseUrl}${path}`,
    method: method,
    params: {
      q: query,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  };

  return config;
};

export const getApiAxiosConfigWithBody = (
  path: string,
  method: Method,
  token: string,
  body: any
) => {
  const config: AxiosRequestConfig = {
    url: `${apiBaseUrl}${path}`,
    method: method,
    data: body,
    headers: {
      authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  };

  return config;
};
