import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { PageButton } from "../../../Styles/Page-cards";

const SaveButton = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onClick = () => {
    if (!newCarState.chosenCar || !newCarState.chosenGarage) return;

    dispatch(actions.newCar.save(newCarState.chosenCar.id, newCarState.chosenGarage.id));
  };

  const bothChosen = newCarState.chosenCar && newCarState.chosenGarage;
  const saving = newCarState.api.saving;

  return (
    <PageButton disabled={!bothChosen || saving} green onClick={() => onClick()}>
      Save
    </PageButton>
  );
};

export default SaveButton;
