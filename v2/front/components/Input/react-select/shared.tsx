import { blackA, red } from "@radix-ui/colors";
import { components, StylesConfig } from "react-select";

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

export const styles: StylesConfig = {
  noOptionsMessage: (styles) => ({
    ...styles,
    backgroundColor: `${red.red8}`,
    color: "black",
  }),
};

export const NoOptionsMessage = (props: any) => (
  <components.NoOptionsMessage {...props}>No results</components.NoOptionsMessage>
);
