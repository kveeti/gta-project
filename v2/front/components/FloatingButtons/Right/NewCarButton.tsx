import { useRouter } from "next/router";
import { NewCarIcon } from "../../Icons/NewCarIcon";
import { SmallFloatingButton } from "../Styles";

export const FloatingNewCarButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/car", "/new/car");
  };

  return (
    <SmallFloatingButton onClick={() => onClick()}>
      <NewCarIcon />
    </SmallFloatingButton>
  );
};
