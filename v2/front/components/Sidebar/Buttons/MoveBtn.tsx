import { useISelector } from "../../../state/hooks";
import { useDispatch } from "react-redux";
import { SidebarBtn } from "./Styles";
import { actions } from "../../../state/actions";
import { toast } from "react-toastify";
import { msgs } from "../../../util/messages";

export const MoveBtn = () => {
  const dispatch = useDispatch();

  const checkedCars = useISelector((state) => state.checked.cars);
  const showValue = useISelector((state) => state.move.show);

  const onClick = () => {
    if (!checkedCars.length) return toast.error(msgs.error.noCarsSelected);
    dispatch(actions.move.show(!showValue));
  };

  return (
    <SidebarBtn blue onClick={onClick} disabled={!checkedCars.length && !showValue}>
      {showValue ? "Close" : "Move"}
    </SidebarBtn>
  );
};
