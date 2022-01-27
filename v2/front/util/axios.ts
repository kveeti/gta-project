import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { toast } from "react-toastify";
import { accessTokenHeaderName, apiBaseUrl } from "../envs";
import { getAccessToken, setAccessToken } from "./accessToken";

const axiosErrorHandler = (error: any) => {
  if (!error.response || error.response.status >= 502)
    return toast.error("Failed connecting to the server, please try again later.");

  const statusCode = error?.response?.status;

  if (statusCode === 500) return toast.error("Server error, please try again later.");
  if (statusCode === 400) return toast.error(error.response.data);
  if (statusCode === 409) return toast.error(error.response.data);
  if (statusCode === 401) return;

  toast.error("Something went wrong, no changes were made.");
};

const config = (path: string, method: Method, data?: any): AxiosRequestConfig => {
  return {
    url: `${apiBaseUrl}${path}`,
    method,
    data,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
};

export const request = async (
  path: string,
  method: Method,
  data?: any
): Promise<AxiosResponse | null> => {
  try {
    const response = await axios(config(path, method, data));

    const accessToken = response.headers[accessTokenHeaderName];
    if (accessToken) setAccessToken(accessToken);

    return response;
  } catch (err) {
    axiosErrorHandler(err);
    return null;
  }
};
