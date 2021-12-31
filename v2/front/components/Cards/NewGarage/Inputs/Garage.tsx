import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
import { InputContainer } from "../../../Styles/Page-cards";
import { Garage } from "../../Garages/Garage";
import { StyledLabel } from "../Styles";

export const GarageInput = () => {
  const newGarageState = useISelector((state) => state.newGarage);

  return (
    <InputContainer>
      <StyledLabel htmlFor="garage-input">Garage</StyledLabel>
      {newGarageState.chosenGarage ? <ChosenGarage /> : <TextField />}
    </InputContainer>
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
      onChange={(e) => onInputChange(e.target.value)}
      value={newGarageState.inputs.garage}
    />
  );
};
