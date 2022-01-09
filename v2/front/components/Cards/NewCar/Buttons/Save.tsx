import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { PageButton } from "../../../Styles/Page-cards";

const SaveButton = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onClick = () => {
    if (!newCarState.chosenCar) return toast.error("No car chosen");
    if (!newCarState.chosenGarage) return toast.error("No garage chosen");

    dispatch(actions.newCar.save(newCarState.chosenCar, newCarState.chosenGarage));
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
