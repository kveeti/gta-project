import { styled } from "../../stitches.config";

export const Main = styled("main", {
  width: "calc(100% - 430px)",
  display: "flex",
  overflow: "auto",
  height: "auto",

  variants: {
    center: {
      true: {
        justifyContent: "center",
        alignItems: "flex-start",
      },
    },
  },
});

export const Content = styled("div", {
  flex: 1,
  display: "flex",
  minHeight: 0,
  flexDirection: "row",
  justifyContent: "flex-start",
  margin: "0 auto",
  height: "calc(100vh - 5rem)",
  maxWidth: "1800px",

  overflow: "hidden",
});

export const Section = styled("section", {
  height: "100vh",
  backgroundColor: "$background",
  overflow: "hidden",
});
