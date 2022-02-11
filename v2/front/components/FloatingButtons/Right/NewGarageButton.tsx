import { useRouter } from "next/router";
import { paths } from "../../../util/constants";
import { NewGarageIcon } from "../../Icons/NewGarageIcon";
import { SmallFloatingButton } from "../Styles";

export const FloatingNewGarageButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(paths.newGarage());
  };

  return (
    <SmallFloatingButton onClick={() => onClick()}>
      <NewGarageIcon />
    </SmallFloatingButton>
  );
};
