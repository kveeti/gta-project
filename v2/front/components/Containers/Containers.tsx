import { styled } from "../../stitches.config";

export const Main = styled("main", {
  padding: "1rem 0.5rem 1rem 1rem",
  height: "calc(100vh - 7rem)",
  overflowX: "hidden",
  overflowY: "auto",

  "@tablet": {
    padding: "0.5rem",
    height: "calc(100vh - 5rem)",
  },
});

export const Content = styled("div", {
  maxWidth: "1800px",
  height: "calc(100vh - 5rem)",
  margin: "0 auto",

  display: "grid",
  gridTemplateColumns: "6fr 2fr",

  "@tablet": {
    height: "calc(100vh - 4rem)",
  },

  "@mobile": {
    gridTemplateColumns: "auto",
  },

  variants: {
    single: {
      // only used in new sites on tablet bp
      true: {
        gridTemplateColumns: "auto",
      },
    },
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

  "@tablet": {
    padding: "0.5rem 0.5rem 0.5rem 0rem",
    height: "calc(100vh - 5rem)",
  },
});
