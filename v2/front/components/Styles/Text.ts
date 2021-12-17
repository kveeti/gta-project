import { styled } from "../../stitches.config";

export const Text = styled("p", {
  fontSize: "1rem",
  margin: "0",
  padding: "0",

  variants: {
    lessOpaque: {
      true: {
        opacity: 0.3,
      },
    },
  },
});

export const Title = styled("h1", {
  all: "unset",
  fontSize: "1.5rem",
  margin: "0",
  padding: "0",
  fontWeight: 500,
});

export const Desc = styled("p", {
  all: "unset",
  fontSize: "1rem",
  paddingTop: "1rem",
  paddingBottom: "2rem",
});
