import { UpdateIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { SmallFloatingButton } from "../Styles";

export const FloatingMoveButton = () => {
  const showValue = useISelector((state) => state.move.show);
  const dispatch = useDispatch();

  return (
    <SmallFloatingButton blue onClick={() => dispatch(actions.move.show(!showValue))}>
      <UpdateIcon />
    </SmallFloatingButton>
  );
};
