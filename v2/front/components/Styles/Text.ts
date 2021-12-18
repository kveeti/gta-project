import { styled } from "../../stitches.config";

export const Text = styled("p", {
  fontSize: "0.9rem",
  margin: "0",
  padding: "0",

  "@grid1to2": {
    fontSize: "1rem",
  },

  "@grid2to3": {
    fontSize: "1rem",
  },

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
  fontSize: "1.2rem",
  margin: "0",
  padding: "0",
  fontWeight: 500,

  "@grid1to2": {
    fontSize: "1.1rem",
  },

  "@grid2to3": {
    fontSize: "1.3rem",
  },
});

export const Desc = styled("p", {
  all: "unset",
  fontSize: "0.8rem",
  paddingTop: "1rem",
  paddingBottom: "2rem",

  "@grid1to2": {
    fontSize: "1rem",
  },

  "@grid2to3": {
    fontSize: "1.1rem",
  },
});
