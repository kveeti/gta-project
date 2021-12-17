import { PersonIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { MenubarBtn } from "../Buttons/Styles";

export const ProfileButton = () => {
  const onClick = () => {
    signIn();
  };

  return (
    <MenubarBtn transparent small onClick={() => onClick()}>
      <PersonIcon style={{ color: "white" }} transform="scale(1.6)" />
    </MenubarBtn>
  );
};
