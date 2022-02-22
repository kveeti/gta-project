import { PlusIcon } from "@radix-ui/react-icons";
import { IconContainer } from "./Styles";

interface Props {
  color?: string;
  height?: number;
  iconStyle?: any;
}

export const NewCarIcon = ({ color, height, iconStyle }: Props) => {
  return (
    <IconContainer>
      <PlusIcon style={{ color: color ? color : "black" }} />
      <img
        src="/icons/car-icon.png"
        alt="car icon"
        height={height ? height : 20}
        style={iconStyle && iconStyle}
      />
    </IconContainer>
  );
};
