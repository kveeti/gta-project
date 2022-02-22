import { Input } from "../../Common/Input/Input";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

export const DescInput = ({ onChange, value }: Props) => {
  return (
    <Input
      id="desc-input"
      type="text"
      placeholder="E.g sports cars (optional)"
      onChange={(value) => onChange(value)}
      value={value}
    />
  );
};
