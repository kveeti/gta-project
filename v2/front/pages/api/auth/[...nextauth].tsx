import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import jwt from "jsonwebtoken";
import { jwtSecret } from "../../../envs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "a test account",
      credentials: {},
      async authorize() {
        const token = {
          name: "test-account",
          email: "testaccount@testaccount.testaccount" + Math.random().toString().slice(2, 11),
        };

        return token;
      },
    }),
  ],
  secret: jwtSecret,

  jwt: {
    secret: jwtSecret,

    encode: ({ token }) => {
      const encoded = jwt.sign(
        { ...token, expire: Date.now() + 1000 * 60 * 60 * 24 * 30 }, // 30 days
        jwtSecret
      );

      return encoded;
    },

    // @ts-ignore
    decode: ({ token }) => {
      const decoded = jwt.verify(token, jwtSecret);

      return decoded;
    },
  },

  callbacks: {
    jwt: async ({ token }) => {
      if (token.name !== "test-account") return token;
      if (!token.email.includes("testaccount@testaccount.testaccount")) return token;
      if (token.sub) return token;

      // manually add sub to the now confirmed test account's token
      token.sub = Math.random().toString().slice(2, 30);

      return token;
    },
  },

  useSecureCookies: true,

  session: {
    strategy: "jwt",
  },

  theme: {
    colorScheme: "light",
  },
});
