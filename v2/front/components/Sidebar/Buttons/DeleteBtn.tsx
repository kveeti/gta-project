import { useISelector } from "../../../state/hooks";
import { SidebarBtn } from "./Styles";

export const DeleteBtn = ({ onClick, open }) => {
  const checkedCars = useISelector((state) => state.checked.cars);

  const showButton = checkedCars.length > 0;

  return (
    <SidebarBtn onClick={(e) => showButton && onClick(e)} red disabled={!showButton}>
      {open ? "Click again to confirm" : "Delete"}
    </SidebarBtn>
  );
};
