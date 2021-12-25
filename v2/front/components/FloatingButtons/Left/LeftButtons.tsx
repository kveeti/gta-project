import { useISelector } from "../../../state/hooks";
import { FloatingButtons } from "../Styles";
import { DeleteButton } from "./DeleteButton";

export const LeftFloatingButton = () => {
  const checkedCars = useISelector((state) => state.checkedCars);

  const showButton = checkedCars.length > 0;

  return <FloatingButtons left>{showButton && <DeleteButton />}</FloatingButtons>;
};
