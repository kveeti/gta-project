import { gray } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  media: {
    bp2: "(min-width: 900px)",

    grid3to4: "(min-width: 6000px)",
    grid2to3: "(min-width: 1765px)",
    grid1to2: "(min-width: 1110px)",

    mobile: "(max-width: 690px)",
    tablet: "(max-width: 1060px)",
  },
  theme: {
    colors: {
      background: "#fafafa",
      menuBar: "#212121",

      cardHover: gray.gray3,
      cardChecked: gray.gray4,
      cardCheckedHover: gray.gray5,
    },
    fonts: {
      font: "Open Sans",
    },
    shadows: {
      theShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
    },
  },
});
