import { styled } from "../../../../stitches.config";

export const InputContainer = styled("div", {
  width: "100%",
  display: "flex",
  gap: "1rem",

  "@mobile": {
    flexDirection: "column",
  },
});

export const Label = styled("label", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: 90,
  fontSize: "0.9rem",

  "@mobile": {
    justifyContent: "normal",
  },

  "@grid1to2": {
    fontSize: "1rem",
  },

  "@grid2to3": {
    fontSize: "1.1rem",
  },
});
