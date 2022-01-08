import { blue, red } from "@radix-ui/colors";
import { styled } from "../../stitches.config";

export const FloatingButton = styled("button", {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "white",
  color: "black",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  transition: "all 0.2s ",

  variants: {
    red: {
      true: {
        backgroundColor: red.red9,
      },
    },
    blue: {
      true: {
        backgroundColor: blue.blue8,
      },
    },
  },
});

export const SmallFloatingButton = styled(FloatingButton, {
  transform: "scale(0.8)",

  variants: {
    big: {
      true: {
        transform: "scale(1.2)",
      },
    },
  },
});

export const FloatingButtons = styled("div", {
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",

  width: "60px",

  variants: {
    right: {
      true: {
        bottom: "40px",
        right: "40px",
      },
    },
    left: {
      true: {
        bottom: "40px",
        left: "40px",
      },
    },
  },
});

export const SmallFloatingButtonsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem",
  gap: "0.5rem",
});
