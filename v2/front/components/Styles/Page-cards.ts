import { styled } from "../../stitches.config";
import { BaseBtn } from "./Buttons";

export const PageCard = styled("div", {
  display: "grid",
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
  marginRight: "1rem",

  "@mobile": {
    justifyContent: "normal",
  },

  "@grid2to3": {
    fontSize: "1rem",
  },

  variants: {
    column: {
      true: {
        justifyContent: "normal",
      },
    },
  },
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

export const PageButton = styled(BaseBtn, {
  padding: "0 2rem",
  height: "100%",
});

export const PageButtonContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "2rem",
  gap: "0.5rem",
});
