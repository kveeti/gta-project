import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { BaseInput } from "../../../Styles/Inputs";
import Car from "../../Cars/Car/Car";
import { InputContainer, Label } from "../Styles/Inputs";

const CarInput = () => {
  const newCarState = useISelector((state) => state.newCar);

  return (
    <InputContainer>
      <Label htmlFor="car-input">Car</Label>
      {newCarState.chosenCar ? <ChosenCar /> : <TextField />}
    </InputContainer>
  );
};

const ChosenCar = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onClick = () => dispatch(actions.newCar.set.chosen.car(null));

  return <Car car={newCarState.chosenCar} onClick={() => onClick()} />;
};

const TextField = () => {
  const dispatch = useDispatch();
  const newCarState = useISelector((state) => state.newCar);

  const [timer, setTimer] = useState(null);

  const carChosen = newCarState.chosenCar;

  const onInputChange = (value: string) => {
    dispatch(actions.newCar.set.input.car(value));

    clearTimeout(timer);

    const timeout = setTimeout(() => {
      dispatch(actions.newCar.search.cars(value));
    }, 200);

    setTimer(timeout);
  };

  return (
    <BaseInput
      transparent
      id="car-input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="8f drafter"
      onChange={(e) => onInputChange(e.target.value)}
      value={newCarState.inputs.car}
    />
  );
};

export default CarInput;
