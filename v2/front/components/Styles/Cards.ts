import { red } from "@radix-ui/colors";
import { styled } from "../../stitches.config";

export const BaseCard = styled("div", {
  borderRadius: 4,
  color: "black",
  backgroundColor: "White",
  boxShadow: "$theShadow",
  padding: "0.8rem",
});

export const Card = styled(BaseCard, {
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  flex: 1,

  "@media (hover: hover)": {
    "&:hover, &:focus": {
      backgroundColor: "$cardHover",
    },
  },

  variants: {
    checked: {
      true: {
        backgroundColor: "$cardChecked",

        "&:hover": {
          backgroundColor: "$cardChecked",
        },

        "&:focus": {
          backgroundColor: "$cardChecked",
        },

        "@media (hover: hover)": {
          "&:hover, &:focus": {
            backgroundColor: "$cardCheckedHover",
          },
        },
      },
    },
    red: {
      true: {
        backgroundColor: red.red7,

        "&:hover": {
          backgroundColor: red.red8,
        },

        "&:focus": {
          backgroundColor: red.red8,
        },

        "@media (hover: hover)": {
          "&:hover, &:focus": {
            backgroundColor: red.red8,
          },
        },
      },
    },
    notAllowed: {
      true: {
        color: "rgba(0,0,0,0.3)",
        cursor: "not-allowed",
      },
    },
  },
});

export const PageCard = styled(BaseCard, {
  display: "grid",
  gap: "1rem",
  maxWidth: "600px",

  variants: {
    centered: {
      true: {
        margin: "0 auto",
      },
    },
  },
});

export const SingleCardPageCard = styled(BaseCard, {
  display: "grid",
  margin: "1rem",
  maxWidth: "400px",
  width: "100%",

  variants: {
    notSoWide: {
      true: {
        maxWidth: "360px",
      },
    },
  },
});
