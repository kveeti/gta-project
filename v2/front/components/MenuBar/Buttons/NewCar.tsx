import { useRouter } from "next/router";
import { NewCarIcon } from "../../Icons/NewCarIcon";
import { MenubarBtn } from "./Styles";

export const NewCarButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/car", "/new/car", { shallow: true });
  };

  return (
    <MenubarBtn transparent onClick={() => onClick()}>
      <NewCarIcon color={"white"} height={22} iconStyle={{ paddingTop: "4px" }} />
    </MenubarBtn>
  );
};
