import { styled } from "../../stitches.config";

export const GridWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
});

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "auto",
  maxWidth: "1216px",
  gap: "0.5rem",
  paddingBottom: "1rem",
  width: "100%",

  "@media (min-width: 600px)": {
    gridTemplateColumns: "auto auto",
  },

  "@media (min-width: 1000px)": {
    gridTemplateColumns: "auto auto auto",
  },

  variants: {
    single: {
      true: {
        gridTemplateColumns: "auto",
      },
    },
  },
});
