import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { store } from "../components/GlobalState/store";

import "../styles/globals.css";

export default ({ Component, pageProps: { session, ...pageProps } }) => (
  <Provider store={store}>
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  </Provider>
);
