import { toast } from "react-toastify";
import { request, requestWithNo401RedirectAndDontSetToken } from "./axios";

export const setAccessToken = (value: string) => {
  try {
    if (value && value.length) {
      const exp = Date.now() + 1000 * 60 * 15;
      localStorage.setItem("access-token", JSON.stringify({ exp, token: value }));
    }
  } catch {
    toast.warn("Couldn't access local storage");
  }
};

interface AccessToken {
  exp: string;
  token: string;
}

export const getAccessTokenOnlyLocal = () => {
  let test = null;

  try {
    test = localStorage.getItem("access-token");
  } catch {
    toast.warn("Couldn't access local storage");
    return null;
  }

  if (!test) return null;

  const accessToken = JSON.parse(test) as AccessToken;

  try {
    if (Date.now() > parseInt(accessToken.exp)) return null;
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

export const handleUnauthorized = () => {
  localStorage.clear();
};
