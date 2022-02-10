import { styled } from "../../stitches.config";

export const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SpaceBetween = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const PageButtonContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "2rem",
  gap: "0.5rem",
});

export const InputContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gap: "1rem 0",

  "@mobile": {
    gridTemplateColumns: "1fr",
  },

  variants: {
    column: {
      true: {
        gridTemplateColumns: "1fr",
      },
    },
  },
});

export const ButtonContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  variants: {
    row: {
      true: {
        flexDirection: "row",
      },
    },
  },
});
