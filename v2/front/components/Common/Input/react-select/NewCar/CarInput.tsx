import { useState } from "react";
import { useDispatch } from "react-redux";
import { OptionProps, components, GroupBase } from "react-select";
import AsyncSelect from "react-select/async";
import { ModelCar } from "../../../../../interfaces/Car";
import { actions } from "../../../../../state/actions";
import { useISelector } from "../../../../../state/hooks";
import { request } from "../../../../../util/axios";
import { Text, Title } from "../../../Text";
import { theme, NoOptionsMessage, styles } from "../shared";

const Option = (props: OptionProps<ModelCar, true, GroupBase<ModelCar>>) => (
  <components.Option {...props}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text>{props.data.manufacturer}</Text>
      <Title>{props.data.name}</Title>
      <Text>{props.data.class}</Text>
    </div>
  </components.Option>
);

export const CarInputSelect = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const inputValue = useISelector((state) => state.newCar.inputs.cars);

  const dispatch = useDispatch();

  const loadOptions = (inputValue: string, callback: (options: ModelCar[]) => void) => {
    if (timer) clearTimeout(timer);

    const timeout = setTimeout(async () => {
      const res = await request(`/modelcars?query=${inputValue}`, "GET");

      if (res) callback(res.data);
    }, 200);

    setTimer(timeout);
  };

  const onChange = (car: ModelCar[], _) => dispatch(actions.newCar.setInput.car(car));

  return (
    <AsyncSelect
      isMulti
      isSearchable
      isClearable
      closeMenuOnScroll
      value={inputValue}
      components={{ Option, NoOptionsMessage }}
      loadOptions={loadOptions}
      onChange={onChange}
      getOptionLabel={(option: ModelCar) => option.name}
      getOptionValue={(option: ModelCar) => option.id}
      placeholder="Select cars..."
      theme={theme}
      styles={styles}
    />
  );
};
