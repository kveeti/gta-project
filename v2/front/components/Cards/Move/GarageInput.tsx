import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { Input } from "../../Input/Input";
import { Label } from "../../Styles/Page-cards";
import { Garage } from "../Garage";

export const GarageInput = () => {
  const moveState = useISelector((state) => state.move);

  return (
    <>
      <Label htmlFor="garage-input">Garage</Label>
      {moveState.chosenGarage ? <ChosenGarage /> : <TextField />}
    </>
  );
};

const ChosenGarage = () => {
  const dispatch = useDispatch();

  const chosenGarage = useISelector((state) => state.move.chosenGarage);

  const onClick = () => dispatch(actions.move.set.chosenGarage(null));

  return <Garage garage={chosenGarage} onClick={() => onClick()} />;
};

const TextField = () => {
  const dispatch = useDispatch();
  const garageInput = useISelector((state) => state.move.garageInput);

  const [timer, setTimer] = useState(null);

  const onInputChange = (value: string) => {
    dispatch(actions.move.set.garageInput(value));

    clearTimeout(timer);

    if (!value) return dispatch(actions.move.matchingGarages.set([]));

    const timeout = setTimeout(() => {
      dispatch(actions.move.matchingGarages.search(value));
    }, 200);

    setTimer(timeout);
  };

  return (
    <Input
      transparent
      id="garage-input"
      type="text"
      placeholder={"E.g. Popular street, unit 2"}
      onChange={(value) => onInputChange(value)}
      value={garageInput}
    />
  );
};
