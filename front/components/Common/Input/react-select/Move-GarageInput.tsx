import { useState } from "react";
import { OptionProps, components, GroupBase } from "react-select";
import AsyncSelect from "react-select/async";
import { IGarage } from "../../../../interfaces/Garage";
import { useISelector } from "../../../../state/hooks";
import { request } from "../../../../util/axios";
import { Text } from "../../Text";
import { theme, NoOptionsMessage, styles } from "./shared";

const Option = (props: OptionProps<IGarage, false, GroupBase<IGarage>>) => (
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

export const Move_GarageInput = ({ onSelect }: Props) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const checkedCars = useISelector((state) => state.checked.cars);

  const loadOptions = (inputValue: string, callback: (options: IGarage[]) => void) => {
    if (timer) clearTimeout(timer);

    const timeout = setTimeout(async () => {
      const res = await request(`/garages?query=${inputValue}`, "GET");

      if (res) callback(res.data);
    }, 200);

    setTimer(timeout);
  };

  return (
    <AsyncSelect
      isSearchable
      isClearable
      isOptionDisabled={(option: IGarage) => option.room < checkedCars.length}
      components={{ Option, NoOptionsMessage }}
      loadOptions={loadOptions}
      onChange={onSelect}
      getOptionLabel={(option: IGarage) => option.name}
      getOptionValue={(option: IGarage) => option.id}
      placeholder="Select a garage..."
      theme={theme}
      styles={styles}
    />
  );
};
