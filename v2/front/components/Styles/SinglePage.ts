import { styled } from "@stitches/react";

export const StyledCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
  padding: "1rem",
  margin: "1rem",
  backgroundColor: "White",
  gap: "1rem",
  maxWidth: "380px",
  width: "100%",
});

export const ButtonContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",

  variants: {
    row: {
      true: {
        flexDirection: "row",
      },
    },
  },
});
