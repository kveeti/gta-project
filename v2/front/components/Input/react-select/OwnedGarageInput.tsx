import { useState } from "react";
import { OptionProps, components } from "react-select";
import AsyncSelect from "react-select/async";
import { IGarage } from "../../../interfaces/Garage";
import { useISelector } from "../../../state/hooks";
import { request } from "../../../util/axios";
import { Text } from "../../Styles/Text";
import { theme, NoOptionsMessage, styles } from "./shared";

const Option = (props: OptionProps<IGarage>) => (
  <components.Option {...props}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Text>{props.label}</Text>
      <Text>
        {props.data.cars.length} / {props.data.capacity}
      </Text>
    </div>
  </components.Option>
);

interface Props {
  onSelect: (value: IGarage) => void;
}

export const OwnedGarageInput = ({ onSelect }: Props) => {
  const [timer, setTimer] = useState(null);

  const checkedCars = useISelector((state) => state.checked.cars);

  const loadOptions = (inputValue: string, callback: (options: IGarage[]) => void) => {
    clearTimeout(timer);

    const timeout = setTimeout(async () => {
      const res = await request(`/garages?query=${inputValue}`, "GET");

      if (res) callback(res.data);
    }, 200);

    setTimer(timeout);
  };

  return (
    <AsyncSelect
      components={{ Option, NoOptionsMessage }}
      loadOptions={loadOptions}
      onChange={onSelect}
      placeholder="Select a garage..."
      theme={theme}
      styles={styles}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      isOptionDisabled={(option) => option.room < checkedCars.length}
    />
  );
};
