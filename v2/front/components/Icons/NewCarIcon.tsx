import { PlusIcon } from "@radix-ui/react-icons";
import { IconContainer } from "./Styles";

interface Props {
  color?: string;
  height?: number;
}

export const NewCarIcon = ({ color, height }: Props) => {
  return (
    <IconContainer>
      <PlusIcon style={{ color: color ? color : "black" }} />
      <img src="/icons/car-icon.png" alt="car icon" height={height ? height : 20} />
    </IconContainer>
  );
};
