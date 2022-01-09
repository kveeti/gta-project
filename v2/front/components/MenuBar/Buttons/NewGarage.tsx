import { useRouter } from "next/router";
import { NewGarageIcon } from "../../Icons/NewGarageIcon";
import { MenubarBtn } from "./Styles";

export const NewGarageButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/garage", "/new/garage", { shallow: true });
  };

  return (
    <MenubarBtn transparent onClick={() => onClick()}>
      <NewGarageIcon color={"white"} height={25} />
    </MenubarBtn>
  );
};
