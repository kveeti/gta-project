import { gray } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  media: {
    bp2: "(min-width: 1000px)",
  },
  theme: {
    colors: {
      background: "#fafafa",

      cardHover: gray.gray3,
      cardChecked: gray.gray4,
      cardCheckedHover: gray.gray5,
    },
    fonts: {
      font: "Open Sans",
    },
  },
});
