import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  theme: {
    colors: {
      gray900: "#111111",
      gray800: "#161617",
      gray700: "#1c1c1d",
      gray100: "#fcfdfd",

      background: "$gray900",
      text: "$gray100",

      card: "$gray700",
      cardChecked: "$gray800",
    },
  },
});
