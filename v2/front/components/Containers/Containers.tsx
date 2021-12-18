import { styled } from "../../stitches.config";

export const Main = styled("main", {
  padding: "1rem 0.5rem 1rem 1rem",
  height: "calc(100vh - 7rem)",
  overflowX: "hidden",
  overflowY: "auto",

  "@mobile": {
    padding: "1rem",
  },
});

export const Content = styled("div", {
  maxWidth: "1800px",
  height: "calc(100vh - 5rem)",
  margin: "0 auto",

  display: "grid",
  gridTemplateColumns: "6fr 2fr",

  "@tablet": {
    gridTemplateColumns: "auto",
  },
});

export const Section = styled("section", {
  height: "100vh",
  backgroundColor: "$background",
  overflow: "hidden",
});

export const SidebarContainer = styled("div", {
  padding: "1rem 1rem 1rem 0.5rem",
  minWidth: "330px",
  height: "calc(100vh - 7rem)",
});
