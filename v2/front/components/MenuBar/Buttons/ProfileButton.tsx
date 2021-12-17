import { PersonIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { MenubarBtn } from "../Buttons/Styles";

export const ProfileButton = () => {
  const { data } = useSession();

  const onClick = () => {
    if (data) return signOut();

    signIn();
  };

  return (
    <MenubarBtn transparent small onClick={() => onClick()}>
      <PersonIcon style={{ color: "white" }} transform="scale(1.6)" />
    </MenubarBtn>
  );
};
