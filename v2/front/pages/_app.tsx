import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../state/store";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "../util/axios";
import { AuthenticationCheck } from "../components/AuthenticationCheck";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [blocked, setBlocked] = useState(true);

  return (
    <Provider store={store}>
      <AuthenticationCheck setBlocked={setBlocked} />
      {!blocked && <Component {...pageProps} />}
    </Provider>
  );
};

export default App;
