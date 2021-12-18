import { PlusIcon } from "@radix-ui/react-icons";
import { IconContainer } from "./Styles";

export const NewCarIcon = () => {
  return (
    <IconContainer>
      <PlusIcon style={{ color: "black" }} />
      <img src="/icons/car-icon.png" alt="car icon" height={20} />
    </IconContainer>
  );
};
