import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
import { InputContainer } from "../../../Styles/Page-cards";
import Car from "../../Cars/Car";
import { StyledLabel } from "../Styles";

const CarInput = () => {
  const newCarState = useISelector((state) => state.newCar);

  return (
    <InputContainer>
      <StyledLabel htmlFor="car-input">Car</StyledLabel>
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

  const onInputChange = (value: string) => {
    dispatch(actions.newCar.set.input.car(value));

    clearTimeout(timer);

    const timeout = setTimeout(() => {
      dispatch(actions.newCar.search.cars(value));
    }, 200);

    setTimer(timeout);
  };

  return (
    <Input
      transparent
      id="car-input"
      type="text"
      autoFocus
      placeholder="E.g 8f drafter"
      onChange={(value) => onInputChange(value)}
      value={newCarState.inputs.car}
    />
  );
};

export default CarInput;
