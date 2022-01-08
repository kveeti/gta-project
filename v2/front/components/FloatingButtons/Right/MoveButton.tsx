import { UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { SmallFloatingButton } from "../Styles";

export const FloatingMoveButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(actions.checked.setShow(false));
    router.push("/move", "/move", { shallow: true });
  };

  return (
    <SmallFloatingButton blue onClick={() => onClick()}>
      <UpdateIcon />
    </SmallFloatingButton>
  );
};
