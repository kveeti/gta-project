import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
import { InputContainer } from "../../../Styles/New-cards";
import { Garage } from "../../Garages/Garage";
import { StyledLabel } from "../Styles";

const GarageInput = () => {
  const newCarState = useISelector((state) => state.newCar);

  return (
    <InputContainer>
      <StyledLabel htmlFor="garage-input">Garage</StyledLabel>
      {newCarState.chosenGarage ? <ChosenGarage /> : <TextField />}
    </InputContainer>
  );
};

const ChosenGarage = () => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const onClick = () => dispatch(actions.newCar.set.chosen.garage(null));

  return <Garage garage={newCarState.chosenGarage} onClick={() => onClick()} wide />;
};

const TextField = () => {
  const dispatch = useDispatch();
  const newCarState = useISelector((state) => state.newCar);

  const [timer, setTimer] = useState(null);

  const onInputChange = (value: string) => {
    dispatch(actions.newCar.set.input.garage(value));

    clearTimeout(timer);

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
      onChange={(e) => onInputChange(e.target.value)}
      value={newCarState.inputs.garage}
    />
  );
};

export default GarageInput;
