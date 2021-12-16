import { styled } from "../../stitches.config";

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(250px, 1fr))",
  gap: "0.5rem",
  padding: "1rem 0.5rem 1rem 1rem",
  width: "100%",

  variants: {
    single: {
      true: {
        gridTemplateColumns: "auto",
        padding: 0,
      },
    },
  },
});
