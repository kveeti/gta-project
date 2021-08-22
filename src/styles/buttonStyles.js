import { makeStyles } from "@material-ui/core";

import { colors } from "./colors";

export const useBtnStyles = makeStyles((theme) => ({
  ccRoot: {
    alignItems: "center",
  },

  ccWrapper: {
    margin: theme.spacing(0.5),
    position: "relative",
  },

  buttonSuccess: {
    backgroundColor: colors.green.primary,
    "&:hover": {
      backgroundColor: colors.green.hover,
    },
  },

  buttonFailure: {
    backgroundColor: colors.red.primary,
    "&:hover": {
      backgroundColor: colors.red.hover,
    },
  },

  buttonProgress: {
    color: colors.text.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  buttonProgressFailure: {
    color: colors.red.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  clearButton: {
    color: colors.red.primary,
    border: `1px solid ${colors.red.primary}`,
  },

  buttons: {
    backgroundColor: colors.buttons.primary,
    color: colors.text.primary,
    "&:hover": {
      backgroundColor: colors.buttons.hover,
    },
  },

  deleteBtn: {
    color: colors.red.primary,
    "&:hover": {
      color: colors.red.hover,
    },
  },
}));
