import { Input } from "../../../Input/Input";
import { Label } from "../../../Styles/Page-cards";

export const NameInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="name">Name</Label>
    <Input transparent onChange={setValue} value={value} type="text" id="name" />
  </>
);

export const ManufacturerInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="manufacturer">Manufacturer</Label>
    <Input transparent onChange={setValue} value={value} type="text" id="manufacturer" />
  </>
);

export const ClassInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="class">Class</Label>
    <Input transparent onChange={setValue} value={value} type="text" id="class" />
  </>
);

export const LinkInput = ({ value, setValue }) => (
  <>
    <Label htmlFor="link">Link</Label>
    <Input transparent onChange={setValue} value={value} type="text" id="link" />
  </>
);
