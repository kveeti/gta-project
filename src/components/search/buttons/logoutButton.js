import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core/";

import { logout } from "../../../actions/auth.js";
import { useStyles } from "../../../styles/buttonStyles.js";

const LogoutButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <Button
      className={classes.clearButton}
      style={{ marginTop: "8px" }}
      variant="outlined"
      size="small"
      fullWidth
      onClick={() => {
        dispatch(logout());
        history.push("/login");
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
