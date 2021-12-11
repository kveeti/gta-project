import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

const composeEnchancers = compose && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

export const store = createStore(reducers, composeEnchancers(applyMiddleware(thunk)));

export type IDispatch = typeof store.dispatch;
