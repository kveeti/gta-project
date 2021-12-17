import { Cross1Icon } from "@radix-ui/react-icons";
import { MutableRefObject } from "react";
import { styled } from "../../stitches.config";

const StyledIcon = styled("div", {
  all: "unset",
  display: "flex",
  padding: "1rem",
  cursor: "pointer",

  variants: {
    hide: {
      true: {
        display: "none",
      },
    },
  },
});

interface Props {
  hide?: boolean;
  input: MutableRefObject<HTMLInputElement>;
}

export const ClearIcon = ({ hide, input }: Props) => {
  const isInputEmpty = input.current?.value.length === 0;

  return (
    <StyledIcon
      hide={hide || isInputEmpty}
      onClick={() => {
        input.current.value = "";
      }}
    >
      <Cross1Icon />
    </StyledIcon>
  );
};
