import { Input } from "../../../../Input/Input";
import { Label } from "../../../../Styles/Text";

export const NameInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="name">Name</Label>
    <Input onChange={setValue} value={value} type="text" id="name" />
  </>
);

export const CapacityInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="capacity">Capacity</Label>
    <Input onChange={setValue} value={value} type="number" id="capacity" />
  </>
);
