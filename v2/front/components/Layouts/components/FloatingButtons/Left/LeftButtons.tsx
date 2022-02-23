import { useISelector } from "../../../../../state/hooks";
import { FloatingButtons } from "../Styles";
import { FloatingHomeButton } from "./HomeButton";
import { ShowCheckedButton } from "./ShowCheckedButton";

export const LeftFloatingButtons = () => {
  const checkedCars = useISelector((state) => state.checked.cars);
  const showSidebar = useISelector((state) => state.checked.show);

  const showCheckedCarsButton = checkedCars.length > 0 || showSidebar;

  return (
    <FloatingButtons left>
      {showCheckedCarsButton ? <ShowCheckedButton /> : <FloatingHomeButton />}
    </FloatingButtons>
  );
};
