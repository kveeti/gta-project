import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import { jwtSecret } from "../envs";
import { User } from "../interfaces/User";
import { getAccessToken } from "./accessToken";

const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch {
    toast.warn("Hey...");
    return null;
  }
};

export const getUser = (token: string): User => {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  return decoded as User;
};

export const checkAdmin = async () => {
  const token = await getAccessToken();
  if (!token) return false;

  const user = getUser(token);
  if (!user) return false;

  return user.role === "Admin";
};
