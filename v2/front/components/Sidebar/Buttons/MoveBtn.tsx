import { useDispatch } from "react-redux";
import { useISelector } from "../../../state/hooks";
import { SidebarBtn } from "./Styles";

export const MoveBtn = () => {
  const dispatch = useDispatch();
  const checkedCars = useISelector((state) => state.checkedCars);

  const showCheckedCars = checkedCars.length > 0;

  const onClick = () => {
    // move
  };

  return (
    <SidebarBtn blue disabled={!showCheckedCars}>
      Move
    </SidebarBtn>
  );
};
