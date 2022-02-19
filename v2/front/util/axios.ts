import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { toast } from "react-toastify";
import { accessTokenHeader, apiBaseUrl } from "../envs";
import {
  getAccessTokenNoRedirect,
  getAccessTokenOnlyLocal,
  handleUnauthorized,
  setAccessToken,
} from "./accessToken";
import { msgs } from "./constants";

const axiosErrorHandler = (error: any, redirect401 = true) => {
  if (!error.response || error.response.status >= 502)
    return toast.error(msgs.error.failedServerConnection);

  const statusCode = error?.response?.status;

  if (statusCode === 500) return toast.error(msgs.error.serverError);
  if (statusCode === 400) return toast.error(error.response.data);
  if (statusCode === 409) return toast.error(error.response.data);
  if (redirect401 && statusCode === 401) return handleUnauthorized();
  if (statusCode === 401) return;

  toast.error(msgs.error.somethingWentWrong);
};

const config = (path: string, method: Method, data?: any): AxiosRequestConfig => {
  return {
    url: `${apiBaseUrl}${path}`,
    method,
    data,
    headers: {
      Authorization: `Bearer ${getAccessTokenOnlyLocal()}`,
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

    const accessToken = response.headers[accessTokenHeader];
    setAccessToken(accessToken);

    return response;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      const accessToken = await getAccessTokenNoRedirect();
      setAccessToken(accessToken);

      return retry(path, method, data);
    }

    axiosErrorHandler(err);
    return null;
  }
};

const retry = async (path: string, method: Method, data?: any) => {
  try {
    const response = await axios(config(path, method, data));

    const accessToken = response.headers[accessTokenHeader];
    setAccessToken(accessToken);

    return response;
  } catch (err) {
    axiosErrorHandler(err);
    return null;
  }
};

export const requestNo401Redirect = async (
  path: string,
  method: Method,
  data?: any
): Promise<AxiosResponse | null> => {
  try {
    const response = await axios(config(path, method, data));

    const accessToken = response.headers[accessTokenHeader];
    setAccessToken(accessToken);

    return response;
  } catch (err) {
    axiosErrorHandler(err, false);
    return null;
  }
};

export const requestWithNo401RedirectAndDontSetToken = async (
  path: string,
  method: Method,
  data?: any
) => {
  try {
    const response = await axios(config(path, method, data));

    return response;
  } catch (err) {
    axiosErrorHandler(err, false);
    return null;
  }
};
