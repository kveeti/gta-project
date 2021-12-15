import { styled } from "../../stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "0.7rem",
  borderRadius: "3px",
  cursor: "pointer",
  color: "black",
  width: "100%",
  transition: "0.2s",

  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",

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
    white: {
      true: {
        backgroundColor: "white",
        color: "black",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",

        "&:hover": {
          backgroundColor: "white",
        },

        "&:focus": {
          backgroundColor: "white",
        },
      },
    },
  },
});
