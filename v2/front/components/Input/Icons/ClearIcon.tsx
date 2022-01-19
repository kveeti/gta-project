import { Cross1Icon } from "@radix-ui/react-icons";
import { styled } from "../../../stitches.config";

const StyledIcon = styled("div", {
  all: "unset",
  display: "flex",
  padding: "0 1rem",
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
  value: string;
  onChange: (value: string) => void;
}

export const ClearIcon = ({ hide, value, onChange }: Props) => {
  return (
    <StyledIcon
      hide={hide || !value}
      onClick={() => {
        onChange("");
      }}
    >
      <Cross1Icon />
    </StyledIcon>
  );
};
