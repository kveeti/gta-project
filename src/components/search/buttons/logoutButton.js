import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core/";

import { logout } from "../../../actions/auth.js";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <Button
      color="secondary"
      variant="contained"
      size="small"
      onClick={() => {
        dispatch(logout());
        history.push("/login");
      }}
      style={{ width: "100%" }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
