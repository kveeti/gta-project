import { makeStyles } from "@material-ui/core";

import { green, red, indigo } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  ccRoot: {
    alignItems: "center",
  },

  ccWrapper: {
    margin: theme.spacing(0.5),
    position: "relative",
  },

  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },

  buttonFailure: {
    backgroundColor: red[700],
    "&:hover": {
      backgroundColor: red[900],
    },
  },

  buttonProgress: {
    color: indigo[50],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  buttonProgressFailure: {
    color: red[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  clearButton: {
    color: "#b02828",
    border: "1px solid #b02828",
  },

  buttons: {
    backgroundColor: "#777777",
    color: "white",
    "&:hover": {
      backgroundColor: "#555555",
    },
  },
}));
