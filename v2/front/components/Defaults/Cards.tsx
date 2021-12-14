import { styled } from "../../stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "0.7rem",
  backgroundColor: "$card",
  borderRadius: "3px",
  cursor: "pointer",

  variants: {
    checked: {
      true: {
        backgroundColor: "$cardChecked",
      },
    },
  },
});
