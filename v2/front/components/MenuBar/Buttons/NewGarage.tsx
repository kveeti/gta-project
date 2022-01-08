import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { MenubarBtn } from "./Styles";

export const NewGarageButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/garage", "/new/garage", { shallow: true });
  };

  return (
    <MenubarBtn transparent onClick={() => onClick()}>
      <PlusIcon style={{ color: "white" }} />
      <img src="/icons/garage-icon.png" alt="garage icon" height={26} />
    </MenubarBtn>
  );
};
