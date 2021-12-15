import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  theme: {
    colors: {
      gray900: "#111111",
      gray850: "#141415",
      gray800: "#161617",
      gray750: "#19191a",
      gray700: "#1c1c1d",
      gray200: "#e8e8e8",
      gray150: "#ececec",
      gray100: "#fcfdfd",

      background: "$gray900",
      text: "$gray100",

      card: "$gray700",
      cardHover: "$gray750",
      cardChecked: "$gray800",
      cardCheckedHover: "$gray850",

      whiteCardHover: "$gray150",
    },
  },
});
