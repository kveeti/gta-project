import { styled } from "../../../stitches.config";
import { BaseBtn } from "../../Styles/Buttons";

export const MenubarBtn = styled(BaseBtn, {
  display: "inline-flex",
  padding: "0 0.5rem",
  alignItems: "center",
  justifyContent: "center",
  height: "3rem",
  gap: "0.3rem",

  variants: {
    small: {
      true: {
        padding: "0 1rem",
      },
    },
  },
});
