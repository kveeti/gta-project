import { makeStyles } from "@material-ui/core";

import { colors } from "./colors";

export const useCardStyles = makeStyles(
  (theme) => ({
    noHoverCards: {
      backgroundColor: colors.cards.primary,
    },
    cards: {
      backgroundColor: colors.cards.primary,
      "&:hover": {
        backgroundColor: colors.cards.hover,
      },
    },
    chosenCards: {
      backgroundColor: colors.cards.chosen.primary,
      "&:hover": {
        backgroundColor: colors.cards.chosen.hover,
      },
    },
    errorCards: {
      backgroundColor: colors.red.primary,
      "&:hover": {
        backgroundColor: colors.red.hover,
      },
    },
  }),
  { index: 1 }
);
