import { useRouter } from "next/router";
import { MenubarBtn } from "./Styles";

export const HomeButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <MenubarBtn transparent small onClick={() => onClick()}>
      <img src="/icons/home-icon.png" alt="home icon" height={25} />
    </MenubarBtn>
  );
};
