import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { store } from "../state/store";

import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

export default ({ Component, pageProps: { session, ...pageProps } }) => (
  <Provider store={store}>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </Provider>
);
