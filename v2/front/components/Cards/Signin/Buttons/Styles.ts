import { styled } from "../../../../stitches.config";
import { BaseBtn } from "../../../Styles/Buttons";

export const StyledButton = styled(BaseBtn, {
  width: "100%",
  height: "2rem",
  fontSize: "1rem",

  "@grid1to2": {
    fontSize: "1.1rem",
    height: "2.5rem",
  },
});
