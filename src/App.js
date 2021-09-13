import { lazy, Suspense } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { SET_LOGGED_IN } from "./constants/actionTypes.js";

import "./styles/css/styles.css";

const Home = lazy(() => import("./components/home/home.js"));
const Login = lazy(() => import("./components/login/login.js"));

axios.defaults.withCredentials = true;

const App = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  axios.interceptors.response.use(
    (res) => {
      if (res && res.data && res.data.error) {
        dispatch({ type: SET_LOGGED_IN, payload: false });
        console.log("not logged in");
        return;
      }

      return res;
    },
    (err) => {
      if (axios.isCancel(err)) return;

      console.log(err);

      return Promise.reject(err);
    }
  );

  return (
    <Suspense fallback={<></>}>
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
    </Suspense>
  );
};

export default App;
