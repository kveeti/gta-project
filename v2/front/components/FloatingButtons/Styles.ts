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
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",

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

export const SmallFloatingButton = styled(FloatingButton, {
  transform: "scale(0.8)",
});

export const FloatingButtons = styled("div", {
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "0.5rem",
  alignItems: "center",

  height: "300px",
  width: "60px",

  bottom: "40px",
  right: "40px",
});
