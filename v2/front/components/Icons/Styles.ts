import { styled } from "../../stitches.config";

export const IconContainer = styled("div", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "3rem",
  gap: "0.3rem",

  variants: {
    small: {
      true: {
        padding: "0 1rem",
      },
    },
  },
});
