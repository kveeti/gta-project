import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
    }),
  ]
});