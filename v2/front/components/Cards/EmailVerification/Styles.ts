import { styled } from "../../../stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "white",

  padding: "1rem",
  gap: "2rem",
  width: "100%",
  maxWidth: "260px",

  boxShadow: "$theShadow",
});
