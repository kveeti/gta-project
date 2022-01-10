import { Input } from "../../Input/Input";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

export const DescInput = ({ onChange, value }: Props) => {
  return (
    <Input
      transparent
      id="desc-input"
      type="text"
      autoFocus
      placeholder="E.g sports cars (optional)"
      onChange={(value) => onChange(value)}
      value={value}
    />
  );
};
