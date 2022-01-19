import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { styled } from "../../../stitches.config";

const StyledIcon = styled("label", {
  all: "unset",
  display: "flex",
  padding: "0 1rem",
  transform: "scale(1.3)",
});

interface Props {
  toggled: boolean;
  onClick: () => void;
  id: string;
}

export const ShowIcon = ({ toggled, onClick, id }: Props) => {
  return (
    <StyledIcon htmlFor={id} onClick={onClick}>
      {toggled ? <EyeNoneIcon /> : <EyeOpenIcon />}
    </StyledIcon>
  );
};
