import { useISelector } from "../../../state/hooks";
import { FloatingButtons } from "../Styles";
import { ShowCheckedButton } from "./ShowCheckedButton";

export const LeftFloatingButton = () => {
  const checkedCars = useISelector((state) => state.checked.cars);
  const showSidebar = useISelector((state) => state.checked.show);

  const showButton = checkedCars.length > 0 || showSidebar;

  return <FloatingButtons left>{showButton && <ShowCheckedButton />}</FloatingButtons>;
};
