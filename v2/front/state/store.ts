import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

const composeEnchancers =
  typeof window !== "undefined"
    ? compose &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : compose;

export const store = createStore(reducers, {}, composeEnchancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
