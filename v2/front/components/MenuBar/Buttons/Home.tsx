import { useRouter } from "next/router";
import { MenubarBtn } from "./Styles";

export const HomeButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/", "/", { shallow: true });
  };

  return (
    <MenubarBtn transparent home onClick={() => onClick()}>
      <img src="/icons/home-icon.png" alt="home icon" height={25} />
    </MenubarBtn>
  );
};
