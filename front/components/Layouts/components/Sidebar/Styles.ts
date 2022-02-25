import { gray } from "@radix-ui/colors";
import { styled } from "@stitches/react";
import { BaseBtn } from "../../../Common/Buttons";

export const SidebarBtn = styled(BaseBtn, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  height: 35,
  width: "100%",
});

export const StyledSidebar = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
  backgroundColor: "white",
});

export const TopContainer = styled("div", {
  gap: "0.5rem",
  padding: "0.5rem",

  "@mobile": {
    borderBottom: "none",
    padding: "0 0.5rem 0.5rem 0.5rem",
    gap: 0,
  },

  variants: {
    paddingBottom: {
      true: {
        paddingBottom: "0.5rem",
      },
    },
  },
});

export const LowerContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflowY: "auto",
  padding: "0.5rem",

  variants: {
    text: {
      true: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
    border: {
      true: {
        borderTop: `1px solid ${gray.gray6}`,
      },
    },
  },
});
