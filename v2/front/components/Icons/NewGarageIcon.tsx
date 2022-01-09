import { PlusIcon } from "@radix-ui/react-icons";
import { IconContainer } from "./Styles";

interface Props {
  color?: string;
  height?: number;
}

export const NewGarageIcon = ({ color, height }: Props) => {
  return (
    <IconContainer>
      <PlusIcon style={{ color: color ? color : "black" }} />
      <img src="/icons/garage-icon.png" alt="garage icon" height={height ? height : 20} />
    </IconContainer>
  );
};
