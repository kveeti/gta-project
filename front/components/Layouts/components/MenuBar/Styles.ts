import { styled } from "../../../../stitches.config";
import { BaseBtn } from "../../../Common/Buttons";

export const MenubarBtn = styled(BaseBtn, {
  display: "inline-flex",
  padding: "0 0.5rem",
  alignItems: "center",
  justifyContent: "center",
  height: "3rem",
  gap: "0.3rem",

  variants: {
    profile: {
      true: {
        padding: "0 1rem",
      },
    },
    home: {
      true: {
        padding: "0 0.8rem",
      },
    },
  },
});

export const MenubarContainer = styled("nav", {
  height: "5rem",
  position: "sticky",
  top: "0px",
  backgroundColor: "$menuBar",
  zIndex: "1",

  "@tablet": {
    height: "4rem",
  },
});

export const MenubarContent = styled("div", {
  margin: "0 auto",
  maxWidth: "1800px",
  display: "grid",
  gridTemplateColumns: "6fr 2fr",
  height: "100%",

  "@mobile": {
    gridTemplateColumns: "10fr 1fr",
  },
});

export const LeftContainer = styled("div", {
  padding: "1rem 0.5rem 1rem 1rem",

  "@tablet": {
    padding: "0.5rem 0rem 0.5rem 0.5rem",
  },
});

export const RightContainer = styled("div", {
  display: "flex",
  padding: "1rem 1rem 1rem 0.5rem",
  justifyContent: "space-between",
  gap: "2rem",
  alignItems: "center",
  minWidth: "330px",

  "@tablet": {
    minWidth: "330px",
    padding: "0.5rem",
  },

  "@mobile": {
    minWidth: "49px",
    padding: "0 20",
  },
});

export const LeftButtons = styled("div", {
  display: "flex",
  gap: "0.5rem",
});
