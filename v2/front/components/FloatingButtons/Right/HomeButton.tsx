import { useRouter } from "next/router";
import { HomeIcon } from "../../Icons/HomeIcon";
import { SmallFloatingButton } from "../Styles";

export const HomeButton = ({}) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <SmallFloatingButton onClick={() => onClick()}>
      <HomeIcon />
    </SmallFloatingButton>
  );
};
