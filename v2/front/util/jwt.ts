import jwt from "jsonwebtoken";

export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token);
  return decoded;
};
