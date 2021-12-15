import { styled } from "../../stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "0.7rem",
  backgroundColor: "$card",
  borderRadius: "3px",
  cursor: "pointer",

  variants: {
    checked: {
      true: {
        backgroundColor: "$cardChecked",

        // "&:hover": {
        //   backgroundColor: "$cardCheckedHover",
        // },
      },
    },
  },
});

export const CarCard = styled(Card, {
  color: "$text",
  width: "100%",

  // "&:hover": {
  //   backgroundColor: "$cardHover",
  // },

  variants: {
    model: {
      true: {
        backgroundColor: "white",
        color: "black",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",

        // "&:hover": {
        //   backgroundColor: "$whiteCardHover",
        // },
      },
    },
  },
});

export const GarageCard = styled(Card, {
  color: "$text",
  width: "100%",

  // "&:hover": {
  //   backgroundColor: "$cardHover",
  // },

  variants: {
    white: {
      true: {
        backgroundColor: "white",
        color: "black",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",

        // "&:hover": {
        //   backgroundColor: "$whiteCardHover",
        // },
      },
    },
  },
});
