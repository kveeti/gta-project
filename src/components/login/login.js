import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core/";
import { GoogleLogin } from "react-google-login";

import { login, checkLogin } from "../../actions/auth.js";

const config = require("../../config.json");

const Login = () => {
  const dispatch = useDispatch();

  let history = useHistory();

  const { loggedIn } = useSelector((state) => state.user);

  const googleSuccess = async (googleData) => {
    try {
      await dispatch(
        login(
          googleData.tokenId,
          googleData.profileObj.name,
          googleData.profileObj.email
        )
      );
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const googleFailure = (err) => {
    console.log("Google login error");
    console.log(err);
  };

  useEffect(() => {
    dispatch(checkLogin());

    if (loggedIn) {
      history.push("/home");
    }
  }, [dispatch, loggedIn, history]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <GoogleLogin
        clientId={config.G_CLIENT_ID}
        render={(renderProps) => (
          <Button
            color="primary"
            variant="contained"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Google login
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Login;
