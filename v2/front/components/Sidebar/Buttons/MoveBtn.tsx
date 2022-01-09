import { useRouter } from "next/router";
import { useISelector } from "../../../state/hooks";
import { SidebarBtn } from "./Styles";

export const MoveBtn = () => {
  const router = useRouter();
  const checkedCars = useISelector((state) => state.checked.cars);

  const showButton = checkedCars.length > 0;

  return (
    <SidebarBtn
      blue
      disabled={!showButton}
      onClick={() => router.push("/move", "/move", { shallow: true })}
    >
      Move
    </SidebarBtn>
  );
};
