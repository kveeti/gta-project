import { PlusIcon } from "@radix-ui/react-icons";
import { IconContainer } from "./Styles";

export const NewGarageIcon = () => {
  return (
    <IconContainer>
      <PlusIcon style={{ color: "black" }} />
      <img src="/icons/garage-icon.png" alt="garage icon" height={22} />
    </IconContainer>
  );
};
