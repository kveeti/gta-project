import { styled } from "@stitches/react";

export const SingleCardPageCard = styled("div", {
  display: "grid",
  borderRadius: 4,
  boxShadow: "$theShadow",
  padding: "1rem",
  margin: "1rem",
  backgroundColor: "White",
  gap: "1rem",
  maxWidth: "400px",
  width: "100%",

  variants: {
    notSoWide: {
      true: {
        maxWidth: "360px",
      },
    },
  },
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
