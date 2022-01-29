import { toast } from "react-toastify";
import { requestWithNo401RedirectAndDontSetToken } from "./axios";

export const setAccessToken = (value: string) => {
  try {
    if (value && value.length) {
      const exp = Date.now() + 1000 * 60 * 15;
      localStorage.setItem("item", exp.toString());
      localStorage.setItem("test", JSON.stringify({ exp, token: value }));
    }
  } catch {
    toast.warn("Couldn't access local storage");
  }
};

interface AccessToken {
  exp: string;
  token: string;
}

export const getTest = () => {
  let test = null;

  try {
    test = localStorage.getItem("test");
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

export const getAccessTokenTest = async () => {
  let token = getTest();

  if (!token) await requestWithNo401RedirectAndDontSetToken("/auth/tokens", "GET");

  token = getTest();

  return token;
};

export const handleUnauthorized = () => {
  localStorage.clear();
  window.location.assign("/signin");
};
