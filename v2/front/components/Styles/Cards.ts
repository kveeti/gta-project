import { red } from "@radix-ui/colors";
import { styled } from "../../stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "0.7rem",
  borderRadius: 4,
  cursor: "pointer",
  color: "black",
  transition: "0.2s",
  backgroundColor: "White",
  flex: 1,

  boxShadow: "$theShadow",

  "@media (hover: hover)": {
    "&:hover, &:focus": {
      backgroundColor: "$cardHover",
    },
  },

  variants: {
    checked: {
      true: {
        backgroundColor: "$cardChecked",

        "&:hover": {
          backgroundColor: "$cardChecked",
        },

        "&:focus": {
          backgroundColor: "$cardChecked",
        },

        "@media (hover: hover)": {
          "&:hover, &:focus": {
            backgroundColor: "$cardCheckedHover",
          },
        },
      },
    },
    red: {
      true: {
        backgroundColor: red.red7,

        "&:hover": {
          backgroundColor: red.red8,
        },

        "&:focus": {
          backgroundColor: red.red8,
        },

        "@media (hover: hover)": {
          "&:hover, &:focus": {
            backgroundColor: red.red8,
          },
        },
      },
    },
    notAllowed: {
      true: {
        color: "rgba(0,0,0,0.3)",
        cursor: "not-allowed",
      },
    },
  },
});
