import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Input } from "../../../Input/Input";
import { Label } from "../../../Styles/Page-cards";

export const DescInput = () => {
  return (
    <>
      <Label htmlFor="desc-input">Description</Label>
      <TextField />
    </>
  );
};

const TextField = () => {
  const dispatch = useDispatch();
  const newGarageState = useISelector((state) => state.newGarage);

  const onInputChange = (value: string) => {
    dispatch(actions.newGarage.setInput.desc(value));
  };

  return (
    <Input
      transparent
      id="desc-input"
      type="text"
      placeholder="E.g. sports cars (optional)"
      onChange={(value) => onInputChange(value)}
      value={newGarageState.inputs.desc}
    />
  );
};
