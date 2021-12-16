import { PersonIcon } from "@radix-ui/react-icons";
import { MenubarBtn } from "../Buttons/Styles";

export const ProfileButton = () => {
  return (
    <MenubarBtn transparent small>
      <PersonIcon style={{ color: "white" }} transform="scale(1.6)" />
    </MenubarBtn>
  );
};
