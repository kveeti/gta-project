import { Input } from "../../../../Input/Input";
import { Label } from "../../../../Styles/Text";

export const NameInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="name">Name</Label>
    <Input onChange={setValue} value={value} type="text" id="name" />
  </>
);

export const ManufacturerInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="manufacturer">Manufacturer</Label>
    <Input onChange={setValue} value={value} type="text" id="manufacturer" />
  </>
);

export const ClassInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="class">Class</Label>
    <Input onChange={setValue} value={value} type="text" id="class" />
  </>
);

export const LinkInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="link">Link</Label>
    <Input onChange={setValue} value={value} type="text" id="link" />
  </>
);
