import { styled } from "../../stitches.config";
import { BaseBtn } from "./Buttons";

export const PageCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  borderRadius: 4,
  boxShadow: "$theShadow",
  gap: "1rem",
  backgroundColor: "white",
  maxWidth: "600px",

  variants: {
    centered: {
      true: {
        margin: "0 auto",
      },
    },
  },
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
