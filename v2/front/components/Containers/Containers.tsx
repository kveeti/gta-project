import { styled } from "../../stitches.config";

export const Main = styled("main", {
  width: "calc(100% - 430px)",
  overflow: "auto",
  height: "auto",
  padding: "0.5rem",
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
});

export const Section = styled("section", {
  height: "100vh",
});
