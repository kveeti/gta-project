import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { PageButton } from "../../../Styles/Page-cards";

const SaveButton = () => {
  const dispatch = useDispatch();

  const newGarageState = useISelector((state) => state.newGarage);

  const onClick = () => {
    dispatch(actions.newGarage.save(newGarageState.chosenGarage.id, newGarageState.inputs.desc));
  };

  const saving = newGarageState.api.saving;

  return (
    <PageButton green onClick={() => onClick()} disabled={!newGarageState.chosenGarage || saving}>
      Save
    </PageButton>
  );
};

export default SaveButton;
