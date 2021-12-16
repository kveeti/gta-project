import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { MenubarBtn } from "./Styles";

const NewGarageButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/garage");
  };

  return (
    <MenubarBtn white onClick={() => onClick()}>
      <PlusIcon />
      <img src="/icons/garage-icon.png" alt="car icon" height={23} />
    </MenubarBtn>
  );
};

export default NewGarageButton;
