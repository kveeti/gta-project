import { styled } from "../../stitches.config";

export const Label = styled("label", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
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

export const InputContainer = styled("div", {
  width: "100%",
  display: "flex",
  gap: "1rem",

  "@mobile": {
    flexDirection: "column",
  },
});

export const MatchingContainer = styled("div", {
  display: "flex",
  gap: "1rem",
});
