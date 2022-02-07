import { blackA, red } from "@radix-ui/colors";
import { components, OptionProps } from "react-select";
import { IGarage } from "../../../interfaces/Garage";

export function theme(theme: any) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: `${blackA.blackA6}`,
      primary: `${blackA.blackA10}`,
    },
  };
}

export const styles = {
  noOptionsMessage: (styles) => ({
    ...styles,
    backgroundColor: `${red.red8}`,
    color: "black",
  }),
};

export const NoOptionsMessage = (props: any) => (
  <components.NoOptionsMessage {...props}>No results</components.NoOptionsMessage>
);
