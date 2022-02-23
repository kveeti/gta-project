import { useISelector } from "../../../../../state/hooks";
import { FloatingButtons } from "../Styles";
import { FloatingHomeButton } from "./HomeButton";
import { ShowCheckedButton } from "./ShowCheckedButton";

export const LeftFloatingButtons = () => {
  const checkedCars = useISelector((state) => state.checked.cars);
  const showSidebar = useISelector((state) => state.checked.show);

  const showCheckedCarsButton = checkedCars.length > 0 || showSidebar;
  const location = window.location.pathname;
  const newSite = location?.includes("new");
  const home = location === "/";

  return (
    <FloatingButtons left>
      {!newSite && showCheckedCarsButton ? <ShowCheckedButton /> : !home && <FloatingHomeButton />}
    </FloatingButtons>
  );
};
