import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { PageButton } from "../../Styles/Page-cards";

export const MoveButton = () => {
  const dispatch = useDispatch();

  const chosenGarage = useISelector((state) => state.move.chosenGarage);
  const saving = useISelector((state) => state.move.api.saving);

  const checkedCars = useISelector((state) => state.checked.cars);
  const searchInput = useISelector((state) => state.search.input.value);

  const onClick = () => {
    if (!checkedCars.length) return toast.error("No cars selected");
    if (!chosenGarage) return toast.error("No garage selected");

    dispatch(actions.move.move(checkedCars, chosenGarage, searchInput));
  };

  return (
    <PageButton
      disabled={!chosenGarage || saving || !checkedCars.length}
      green
      onClick={() => onClick()}
    >
      Move
    </PageButton>
  );
};
