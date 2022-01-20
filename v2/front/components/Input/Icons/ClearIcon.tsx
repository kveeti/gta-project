import { Cross1Icon } from "@radix-ui/react-icons";
import { StyledIcon } from "./Styles";

interface Props {
  hide?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const ClearIcon = ({ hide, value, onChange }: Props) => {
  return (
    <StyledIcon
      style={{ padding: "0 1rem 0 0.5rem" }}
      hide={hide || !value}
      onClick={() => {
        onChange("");
      }}
    >
      <Cross1Icon />
    </StyledIcon>
  );
};
