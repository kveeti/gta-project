import { toast } from "react-toastify";
import { useISelector } from "../../../state/hooks";
import { SidebarBtn } from "./Styles";

export const DeleteBtn = ({ onClick, open }) => {
  const checkedCars = useISelector((state) => state.checked.cars);

  const showButton = checkedCars.length > 0;

  const onBtnClick = (e) => {
    if (!showButton) return toast.error("No cars selected");

    onClick(e);
  };

  return (
    <SidebarBtn onClick={(e) => onBtnClick(e)} red disabled={!showButton}>
      {open ? "Click again to confirm" : "Delete"}
    </SidebarBtn>
  );
};
