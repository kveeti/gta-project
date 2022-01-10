import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useISelector } from "../../../state/hooks";
import { SidebarBtn } from "./Styles";

export const MoveBtn = () => {
  const router = useRouter();
  const checkedCars = useISelector((state) => state.checked.cars);

  const showButton = checkedCars.length > 0;

  const onClick = () => {
    if (!checkedCars.length) return toast.error("No cars selected");

    router.push("/move", "/move", { shallow: true });
  };

  return (
    <SidebarBtn blue disabled={!showButton} onClick={() => onClick()}>
      Move
    </SidebarBtn>
  );
};
