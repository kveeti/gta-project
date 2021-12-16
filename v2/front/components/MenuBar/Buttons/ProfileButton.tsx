import { PersonIcon } from "@radix-ui/react-icons";
import { MenubarBtn } from "../Buttons/Styles";

export const ProfileButton = () => {
  return (
    <MenubarBtn white small>
      <PersonIcon />
    </MenubarBtn>
  );
};
