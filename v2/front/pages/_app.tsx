import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { store } from "../state/store";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "../util/axios";

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <Provider store={store}>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </Provider>
);

export default App;
