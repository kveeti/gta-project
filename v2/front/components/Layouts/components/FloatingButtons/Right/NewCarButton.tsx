import { useRouter } from "next/router";
import { paths } from "../../../../../util/constants";
import { NewCarIcon } from "../../../../Common/Icons/NewCarIcon";
import { SmallFloatingButton } from "../Styles";

export const FloatingNewCarButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(paths.newCar());
  };

  return (
    <SmallFloatingButton onClick={() => onClick()}>
      <NewCarIcon />
    </SmallFloatingButton>
  );
};
