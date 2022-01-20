import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { StyledIcon } from "./Styles";

interface Props {
  toggled: boolean;
  onClick: () => void;
  id: string;
}

export const ShowIcon = ({ toggled, onClick, id }: Props) => {
  return (
    <StyledIcon
      style={{ transform: "scale(1.2)", padding: "0 1rem 0 0.6rem" }}
      htmlFor={id}
      onClick={onClick}
    >
      {toggled ? <EyeNoneIcon /> : <EyeOpenIcon />}
    </StyledIcon>
  );
};
