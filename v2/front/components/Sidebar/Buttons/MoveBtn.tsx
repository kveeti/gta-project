import { useISelector } from "../../../state/hooks";
import { SidebarBtn } from "./Styles";

export const MoveBtn = ({ onClick, open }) => {
  const checkedCars = useISelector((state) => state.checkedCars);

  const showButton = checkedCars.length > 0;

  return (
    <SidebarBtn onClick={(e) => showButton && onClick(e)} blue disabled={!showButton}>
      {open ? "Click again to confirm" : "Move"}
    </SidebarBtn>
  );
};
