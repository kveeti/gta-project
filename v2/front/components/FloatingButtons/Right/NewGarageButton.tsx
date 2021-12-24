import { useRouter } from "next/router";
import { NewGarageIcon } from "../../Icons/NewGarageIcon";
import { SmallFloatingButton } from "../Styles";

export const FloatingNewGarageButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/garage");
  };

  return (
    <SmallFloatingButton onClick={() => onClick()}>
      <NewGarageIcon />
    </SmallFloatingButton>
  );
};
