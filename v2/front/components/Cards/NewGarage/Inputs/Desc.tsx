import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { BaseInput } from "../../../Styles/Inputs";
import { InputContainer, Label } from "../Styles/Inputs";

export const DescInput = () => {
  return (
    <InputContainer>
      <Label htmlFor="desc-input">Description</Label>
      <TextField />
    </InputContainer>
  );
};

const TextField = () => {
  const dispatch = useDispatch();
  const newGarageState = useISelector((state) => state.newGarage);

  const [timer, setTimer] = useState(null);

  const onInputChange = (value: string) => {
    dispatch(actions.newGarage.set.input.desc(value));
  };

  return (
    <BaseInput
      transparent
      id="desc-input"
      type="text"
      autoComplete="off"
      placeholder="Description (optional)"
      onChange={(e) => onInputChange(e.target.value)}
      value={newGarageState.inputs.desc}
    />
  );
};
