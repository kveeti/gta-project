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
  minWidth: "200px",
  flex: 1,

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
  },
});
