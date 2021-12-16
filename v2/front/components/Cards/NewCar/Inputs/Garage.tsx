import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { BaseInput } from "../../../Styles/Inputs";
import { Garage } from "../../Garages/Garage";
import { InputContainer, Label } from "../Styles/Inputs";

const GarageInput = () => {
  const newCarState = useISelector((state) => state.newCar);

  return (
    <InputContainer>
      <Label htmlFor="garage-input">Garage</Label>
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
  const me = useISelector((state) => state.users.me);
  const newCarState = useISelector((state) => state.newCar);

  const [timer, setTimer] = useState(null);

  const getRand = () => {
    const rand = Math.floor(Math.random() * me.garages.length);
    return rand;
  };

  const onInputChange = (value: string) => {
    dispatch(actions.newCar.set.input.garage(value));

    clearTimeout(timer);

    const timeout = setTimeout(() => {
      dispatch(actions.newCar.search.garages(value));
    }, 200);

    setTimer(timeout);
  };

  return (
    <BaseInput
      transparent
      id="garage-input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder={me.garages.length ? `${me.garage[getRand()].name}` : "Popular street, unit 2"}
      onChange={(e) => onInputChange(e.target.value)}
      value={newCarState.inputs.garage}
    />
  );
};

export default GarageInput;
