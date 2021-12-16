import { blackA } from "@radix-ui/colors";
import { styled } from "../../stitches.config";

export const BaseInput = styled("input", {
  all: "unset",
  padding: "0.5rem",
  borderRadius: 4,
  lineHeight: 1,
  fontSize: 15,
  width: "100%",
  transition: "0.2s",
  color: "Black",

  "@media (min-width: 1000px)": {
    fontSize: 16,
  },

  "&:disabled": {
    boxShadow: `0 0 0 1px ${blackA.blackA7}`,
    opacity: 0.5,
  },

  variants: {
    transparent: {
      true: {
        boxShadow: `0 0 0 1px ${blackA.blackA10}`,
        "&::placeholder": {
          opacity: 0.5,
        },

        "@media (hover: hover)": {
          "&:focus": { boxShadow: `0 0 0 2px ${blackA.blackA10}` },
        },
      },
    },

    white: {
      true: {
        backgroundColor: "white",
      },
    },
  },
});
