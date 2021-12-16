import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { MenubarBtn } from "./Styles";

const NewCarButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/car");
  };

  return (
    <MenubarBtn transparent onClick={() => onClick()}>
      <PlusIcon style={{ color: "white" }} />
      <img src="/icons/car-icon.png" alt="car icon" height={22} style={{ paddingTop: "4px" }} />
    </MenubarBtn>
  );
};

export default NewCarButton;
