import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { PageButton } from "../../Styles/Page-cards";

export const MoveButton = () => {
  const dispatch = useDispatch();

  const chosenGarage = useISelector((state) => state.move.chosenGarage);
  const saving = useISelector((state) => state.move.api.saving);

  const checkedCars = useISelector((state) => state.checkedCars);
  const searchInput = useISelector((state) => state.search.input.value);

  const onClick = () => {
    if (!chosenGarage || !checkedCars.length) return;

    dispatch(actions.move.move(checkedCars, chosenGarage.id, searchInput));
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
