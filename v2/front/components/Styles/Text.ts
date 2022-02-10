import { styled } from "../../stitches.config";
import { green, red } from "@radix-ui/colors";

const BaseText = styled("p", {
  all: "unset",
  margin: "0",
  padding: "0",

  variants: {
    lessOpaque: {
      true: {
        opacity: 0.3,
      },
    },

    red: {
      true: {
        color: red.red10,
      },
    },

    green: {
      true: {
        color: green.green10,
      },
    },
  },
});

export const Text = styled(BaseText, {
  fontSize: "0.8rem",

  "@grid1to2": {
    fontSize: "0.9rem",
  },

  "@grid2to3": {
    fontSize: "1rem",
  },
});

export const ButtonText = styled(Text, {
  fontSize: "1rem",
});

export const Title = styled("h1", {
  all: "unset",
  fontSize: "1.1rem",
  fontWeight: 500,

  "@grid2to3": {
    fontSize: "1.2rem",
  },

  variants: {
    padding: {
      true: {
        paddingBottom: "1rem",
      },
    },
  },
});

export const Desc = styled("p", {
  all: "unset",
  fontSize: "1rem",
  paddingBottom: "1rem",

  "@grid1to2": {
    fontSize: "1rem",
  },

  "@grid2to3": {
    fontSize: "1.1rem",
  },
});

export const Label = styled("label", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  fontSize: "0.9rem",
  marginRight: "1rem",

  "@mobile": {
    justifyContent: "normal",
  },

  "@grid2to3": {
    fontSize: "1rem",
  },

  variants: {
    column: {
      true: {
        justifyContent: "normal",
      },
    },
  },
});
