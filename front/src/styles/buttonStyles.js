import { makeStyles } from "@material-ui/core";

import { colors } from "./colors";

export const useBtnStyles = makeStyles(
  (theme) => ({
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

    modifyButton: {
      color: colors.blue.primary,
      border: `1px solid ${colors.blue.primary}`,
      lineHeight: "12px",
      fontSize: "12px",

      "&:hover": {
        color: colors.blue.hover,
        border: `1px solid ${colors.blue.hover}`,
      },
    },

    renameBtn: {
      color: colors.text.primary,
      backgroundColor: colors.buttons.primary,
      lineHeight: "14px",
      fontSize: "12px",

      "&:hover": {
        backgroundColor: colors.buttons.hover,
      },
    },

    deleteBtn: {
      color: colors.red.primary,
      border: `1px solid ${colors.red.primary}`,
      lineHeight: "12px",
      fontSize: "12px",

      "&:hover": {
        color: colors.red.hover,
        border: `1px solid ${colors.red.hover}`,
      },
    },
  }),
  { index: 1 }
);
