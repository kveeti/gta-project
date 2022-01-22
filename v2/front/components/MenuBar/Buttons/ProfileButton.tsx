import { PersonIcon } from "@radix-ui/react-icons";
import { MenubarBtn } from "./Styles";
import { useRouter } from "next/router";

export const ProfileButton = () => {
  const router = useRouter();

  const onClick = async () => {
    await router.push("/me", "/me", { shallow: true });
  };

  return (
    <MenubarBtn transparent profile onClick={() => onClick()}>
      <PersonIcon style={{ color: "white", transform: "scale(1.6)" }} />
    </MenubarBtn>
  );
};
