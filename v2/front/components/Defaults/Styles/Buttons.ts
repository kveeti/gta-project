import { styled } from "../../../stitches.config";

export const FloatingButton = styled("button", {
  position: "fixed",
  display: "flex",
  appearance: "none",
  border: "none",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  cursor: "pointer",
  backgroundColor: "white",
  color: "black",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    transform: "translateY(-0.2rem)",
    transition: "all 0.2s ease-in-out",
  },

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
