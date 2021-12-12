import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,

  jwt: {
    secret: process.env.JWT_SECRET,

    encode: ({ token }) => {
      const encoded = jwt.sign(
        { ...token, expire: Date.now() + 1000 * 30 * 60 },
        process.env.JWT_SECRET
      );

      return encoded;
    },

    // @ts-ignore
    decode: ({ token }) => {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return decoded;
    },
  },

  useSecureCookies: true,

  session: {
    strategy: "jwt",
  },

  theme: {
    colorScheme: "dark",
  },
});
