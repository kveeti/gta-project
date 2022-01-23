import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
import { Label } from "../../../Styles/Page-cards";
import { Garage } from "../../Garages/Garage";

export const GarageInput = () => {
  const newGarageState = useISelector((state) => state.newGarage);

  return (
    <>
      <Label htmlFor="garage-input">Garage</Label>
      {newGarageState.chosenGarage ? <ChosenGarage /> : <TextField />}
    </>
  );
};

const ChosenGarage = () => {
  const dispatch = useDispatch();

  const newGarageState = useISelector((state) => state.newGarage);

  const onClick = () => dispatch(actions.newGarage.set.chosenGarage(null));

  return <Garage garage={newGarageState.chosenGarage} onClick={() => onClick()} />;
};

const TextField = () => {
  const dispatch = useDispatch();
  const newGarageState = useISelector((state) => state.newGarage);

  const [timer, setTimer] = useState(null);

  const onInputChange = (value: string) => {
    dispatch(actions.newGarage.set.input.garage(value));

    clearTimeout(timer);

    if (!value) return dispatch(actions.newGarage.set.garages.matching([]));

    const timeout = setTimeout(() => {
      dispatch(actions.newGarage.search.garages(value));
    }, 200);

    setTimer(timeout);
  };

  return (
    <Input
      transparent
      id="garage-input"
      type="text"
      autoFocus
      placeholder={"E.g. Popular street, unit 2"}
      onChange={(value) => onInputChange(value)}
      value={newGarageState.inputs.garage}
    />
  );
};
