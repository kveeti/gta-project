import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
import { Label } from "../../../Styles/Page-cards";
import { Garage } from "../../Garages/Garage";

const GarageInput = () => {
  const newCarState = useISelector((state) => state.newCar);

  return (
    <>
      <Label htmlFor="garage-input">Garage</Label>
      {newCarState.chosenGarage ? <ChosenGarage /> : <TextField />}
    </>
  );
};

const ChosenGarage = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onClick = () => dispatch(actions.newCar.set.chosen.garage(null));

  return <Garage garage={newCarState.chosenGarage} showCapacity onClick={() => onClick()} />;
};

const TextField = () => {
  const dispatch = useDispatch();
  const newCarState = useISelector((state) => state.newCar);

  const [timer, setTimer] = useState(null);

  const onInputChange = (value: string) => {
    dispatch(actions.newCar.set.input.garage(value));

    clearTimeout(timer);

    if (!value) return dispatch(actions.newCar.set.garages.matching([]));

    const timeout = setTimeout(() => {
      dispatch(actions.newCar.search.garages(value));
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
      value={newCarState.inputs.garage}
    />
  );
};

export default GarageInput;
