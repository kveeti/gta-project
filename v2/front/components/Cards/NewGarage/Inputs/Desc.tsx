import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
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

  const onInputChange = (value: string) => {
    dispatch(actions.newGarage.set.input.desc(value));
  };

  return (
    <Input
      transparent
      id="desc-input"
      type="text"
      placeholder="E.g. sports cars (optional)"
      onChange={(e) => onInputChange(e.target.value)}
      value={newGarageState.inputs.desc}
    />
  );
};
