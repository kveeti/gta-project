import { toast } from "react-toastify";
import { accessTokenHeader } from "../envs";
import { request, requestNo401Redirect } from "./axios";
import { decodeToken } from "./jwt";

export const setAccessToken = (value: string) => {
  try {
    if (value && value.length) {
      const decoded = decodeToken(value);
      const exp = (decoded as any).exp;
      localStorage.setItem(accessTokenHeader, JSON.stringify({ exp, token: value }));
    }
  } catch {
    toast.error("Error, Couldn't access local storage");
  }
};

interface AccessToken {
  exp: string;
  token: string;
}

export const getAccessTokenOnlyLocal = () => {
  let test = null;

  try {
    test = localStorage.getItem(accessTokenHeader);
  } catch {
    toast.error("Error, Couldn't access local storage");
    return null;
  }

  if (!test) return null;

  const accessToken = JSON.parse(test) as AccessToken;

  try {
    if (Date.now() / 1000 > parseInt(accessToken.exp)) return null;
    return accessToken.token;
  } catch {
    return null;
  }
};

export const getAccessToken = async () => {
  let token = getAccessTokenOnlyLocal();

  if (!token) await request("/auth/tokens", "GET");

  token = getAccessTokenOnlyLocal();

  return token;
};

export const getAccessTokenNoRedirect = async () => {
  let token = getAccessTokenOnlyLocal();

  if (!token) await requestNo401Redirect("/auth/tokens", "GET");

  token = getAccessTokenOnlyLocal();

  return token;
};

export const handleUnauthorized = () => {
  console.log("unauthorized");
};
