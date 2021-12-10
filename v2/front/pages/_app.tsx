import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider>
    <Component {...pageProps} />
  </SessionProvider>
);
