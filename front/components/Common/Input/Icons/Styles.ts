import { styled } from "../../../../stitches.config";

export const StyledIcon = styled("label", {
  all: "unset",
  display: "flex",
  cursor: "pointer",

  variants: {
    hide: {
      true: {
        display: "none",
      },
    },
  },
});
