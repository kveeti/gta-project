import { useState } from "react";
import { useDispatch } from "react-redux";
import { OptionProps, components, GroupBase } from "react-select";
import AsyncSelect from "react-select/async";
import { ModelGarage } from "../../../../../interfaces/Garage";
import { actions } from "../../../../../state/actions";
import { useISelector } from "../../../../../state/hooks";
import { request } from "../../../../../util/axios";
import { Text } from "../../../Text";
import { theme, NoOptionsMessage, styles } from "../shared";

const Option = (props: OptionProps<ModelGarage, false, GroupBase<ModelGarage>>) => (
  <components.Option {...props}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text>{props.label}</Text>

      {props.isDisabled && <Text>Already owned</Text>}
    </div>
  </components.Option>
);

export const GarageInputSelect = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const state = useISelector((state) => state.newGarage);
  const inputValue = state.inputs.garage;

  const dispatch = useDispatch();

  const loadOptions = (inputValue: string, callback: (options: ModelGarage[]) => void) => {
    if (timer) clearTimeout(timer);

    const timeout = setTimeout(async () => {
      const res = await request(`/modelgarages?query=${inputValue}`, "GET");

      if (res) callback(res.data);
    }, 200);

    setTimer(timeout);
  };

  const onChange = (garage: ModelGarage, _) => dispatch(actions.newGarage.setInput.garage(garage));

  return (
    <AsyncSelect
      isSearchable
      isClearable
      isOptionDisabled={(option: ModelGarage) => option.alreadyOwned}
      value={inputValue}
      components={{ Option, NoOptionsMessage }}
      loadOptions={loadOptions}
      onChange={onChange}
      getOptionLabel={(option: ModelGarage) => option.name}
      getOptionValue={(option: ModelGarage) => option.id}
      placeholder="Select a garage..."
      theme={theme}
      styles={styles}
    />
  );
};
