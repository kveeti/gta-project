import { gray } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  media: {
    bp2: "(min-width: 900px)",

    grid3to4: "(min-width: 1790px)",
    grid2to3: "(min-width: 1340px)",
    grid1to2: "(min-width: 995px)",

    mobile: "(max-width: 690px)",
    tablet: "(max-width: 1060px)",
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
