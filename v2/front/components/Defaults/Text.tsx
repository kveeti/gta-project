import { styled } from "../../stitches.config";

export const Text = styled("p", {
  fontSize: "1rem",
  margin: "0",
  padding: "0",

  "media (min-width: 600px)": {
    fontSize: "1rem",
  },
});

export const Title = styled("h1", {
  fontSize: "1.5rem",
  margin: "0",
  padding: "0",

  "media (min-width: 600px)": {
    fontSize: "1rem",
  },
});
