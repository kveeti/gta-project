import { styled } from "../../stitches.config";

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "0.5rem",

  "@grid1to2": {
    gridTemplateColumns: "auto auto",
  },

  "@grid2to3": {
    gridTemplateColumns: "auto auto auto",
  },

  "@grid3to4": {
    gridTemplateColumns: "auto auto auto auto",
  },

  variants: {
    single: {
      true: {
        gridTemplateColumns: "auto",
      },
    },
  },
});
