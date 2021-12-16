import { PlusIcon } from "@radix-ui/react-icons";
import { MenubarBtn } from "./Styles";

const NewGarageButton = () => (
  <MenubarBtn white>
    <PlusIcon />
    <img src="/icons/garage-icon.png" alt="car icon" height={23} />
  </MenubarBtn>
);

export default NewGarageButton;
