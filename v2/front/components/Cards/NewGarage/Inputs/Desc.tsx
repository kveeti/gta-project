import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
import { InputContainer } from "../../../Styles/Page-cards";
import { StyledLabel } from "../Styles";

export const DescInput = () => {
  return (
    <InputContainer>
      <StyledLabel htmlFor="desc-input">Description</StyledLabel>
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
