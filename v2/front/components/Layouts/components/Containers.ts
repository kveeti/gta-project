import { styled } from "../../../stitches.config";

export const Content = styled("div", {
  maxWidth: "1800px",
  margin: "0 auto",
  height: "100%",

  display: "grid",
  gridTemplateColumns: "6fr 2fr",

  "@tablet": {
    height: "calc(100% - 5rem)",
  },

  "@mobile": {
    gridTemplateColumns: "auto",
  },

  variants: {
    single: {
      // only used in "new" sites on tablet bp
      true: {
        gridTemplateColumns: "auto",
      },
    },
  },
});

export const Main = styled("main", {
  padding: "1rem 0.5rem 1rem 1rem",
  overflow: "auto",
  height: "calc(100vh - 7rem)",

  "@tablet": {
    padding: "0.5rem",
    height: "calc(100vh - 10rem)",
  },
});

export const SidebarContainer = styled("div", {
  padding: "1rem 1rem 1rem 0.5rem",
  minWidth: "330px",
  overflow: "auto",
  height: "calc(100vh - 7rem)",

  "@tablet": {
    padding: "0.5rem 0.5rem 0.5rem 0rem",
    height: "calc(100vh - 5rem)",
  },

  "@mobile": {
    minWidth: "auto",
    padding: "0.5rem",
  },
});
