import { Provider } from "react-redux";
import { store } from "../state/store";
import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "../util/axios";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
);

export default App;
