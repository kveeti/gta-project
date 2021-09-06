import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Home from "./components/home/home.js";
import Login from "./components/login/login.js";

import axios from "axios";

import { SET_LOGGED_IN } from "./constants/actionTypes.js";

import "./styles.css";

axios.defaults.withCredentials = true;

const App = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        dispatch({ type: SET_LOGGED_IN, payload: false });
      }

      if (axios.isCancel(err)) return;

      dispatch({ type: SET_LOGGED_IN, payload: false });

      return Promise.reject(err);
    }
  );

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          <Redirect
            to={{
              pathname: "/home",
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
