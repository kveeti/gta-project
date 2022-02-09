import { useState } from "react";
import { useDispatch } from "react-redux";
import { OptionProps, components } from "react-select";
import AsyncSelect from "react-select/async";
import { ModelCar } from "../../../../interfaces/Car";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { request } from "../../../../util/axios";
import { Text } from "../../../Styles/Text";
import { theme, NoOptionsMessage, styles } from "../shared";

const Option = (props: OptionProps<ModelCar>) => (
  <components.Option {...props}>
    <Text>{props.label}</Text>
  </components.Option>
);

export const CarInputSelect = () => {
  const [timer, setTimer] = useState(null);
  const inputValue = useISelector((state) => state.newCar.inputs.car);

  const dispatch = useDispatch();

  const loadOptions = (inputValue: string, callback: (options: ModelCar[]) => void) => {
    clearTimeout(timer);

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
