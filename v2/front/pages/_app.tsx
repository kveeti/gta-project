import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider>
    <Component {...pageProps} />
  </SessionProvider>
);
