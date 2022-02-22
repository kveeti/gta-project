import { styled } from "../../stitches.config";

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "0.5rem",

  "@grid1to2": {
    gridTemplateColumns: "1fr 1fr",
  },

  "@grid2to3": {
    gridTemplateColumns: "1fr 1fr 1fr",
  },

  "@grid3to4": {
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  },

  variants: {
    single: {
      true: {
        gridTemplateColumns: "1fr",
      },
    },
  },
});

export const SingleGrid = styled("div", {
  display: "grid",
  gap: "0.5rem",
  transform: "translateY(-0.5rem)",

  variants: {
    noShiftUp: {
      true: {
        transform: "translateY(0)",
      },
    },
  },
});
