import { blackA, red } from "@radix-ui/colors";
import { components, StylesConfig } from "react-select";

export function theme(theme: any) {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: `${blackA.blackA6}`,
      primary: `${blackA.blackA9}`,
    },
  };
}

export const styles: StylesConfig = {
  noOptionsMessage: (base) => ({
    ...base,
    backgroundColor: `${red.red8}`,
    color: "black",
  }),
  option: (base) => ({
    ...base,
    ":not(:last-child)": {
      borderBottom: `1px solid ${blackA.blackA6}`,
    },
  }),
};

export const NoOptionsMessage = (props: any) => (
  <components.NoOptionsMessage {...props}>No results</components.NoOptionsMessage>
);
