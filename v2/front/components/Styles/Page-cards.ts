import { styled } from "../../stitches.config";
import { BaseBtn } from "./Buttons";

export const PageCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "1rem",
  borderRadius: 4,
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
  gap: "1rem",
  backgroundColor: "white",
});

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

export const PageButton = styled(BaseBtn, {
  padding: "0 2rem",
  height: "100%",
});

export const PageButtonContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "2rem",
});
