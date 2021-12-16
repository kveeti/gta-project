import { useDispatch } from "react-redux";
import { useISelector } from "../../../state/hooks";
import { SidebarBtn } from "./Styles";

export const DeleteBtn = () => {
  const dispatch = useDispatch();
  const checkedCars = useISelector((state) => state.checked.cars);

  const showCheckedCars = checkedCars.length > 0;

  const onClick = () => {
    // ask for confirmation
    // delete checked cars
  };

  return (
    <SidebarBtn red disabled={!showCheckedCars}>
      Delete
    </SidebarBtn>
  );
};
