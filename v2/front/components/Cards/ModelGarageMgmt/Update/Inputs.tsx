import { Input } from "../../../Input/Input";
import { Label } from "../../../Styles/Page-cards";

export const NameInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="name">Name</Label>
    <Input transparent onChange={setValue} value={value} type="text" autoFocus id="name" />
  </>
);

export const CapacityInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="capacity">Capacity</Label>
    <Input transparent onChange={setValue} value={value} type="number" id="capacity" />
  </>
);
