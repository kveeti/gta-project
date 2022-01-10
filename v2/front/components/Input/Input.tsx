import { blackA } from "@radix-ui/colors";
import { useEffect, useState } from "react";
import { styled } from "../../stitches.config";
import { ClearIcon } from "./Icons/ClearIcon";
import { SearchIcon } from "./Icons/SearchIcon";

export const BaseInput = styled("input", {
  all: "unset",
  padding: "0.5rem",
  borderRadius: 4,
  lineHeight: 1,
  fontSize: 15,
  width: "100%",
  transition: "0.2s",
  color: "Black",

  "@tablet": {
    fontSize: 16,
  },

  "&:disabled": {
    boxShadow: `0 0 0 1px ${blackA.blackA7}`,
    opacity: 0.5,
  },

  variants: {
    transparent: {
      true: {
        boxShadow: `0 0 0 1px ${blackA.blackA10}`,
        "&::placeholder": {
          opacity: 0.5,
        },

        "@media (hover: hover)": {
          "&:focus": { boxShadow: `0 0 0 2px ${blackA.blackA10}` },
        },
      },
    },

    white: {
      true: {
        backgroundColor: "white",
      },
    },
  },
});

const InputContainer = styled("div", {
  flex: 1,
  height: "100%",
  display: "flex",
  alignItems: "center",
  backgroundColor: "White",
  borderRadius: 4,
  transition: "0.2s",

  "&:disabled": {
    boxShadow: `0 0 0 1px ${blackA.blackA7}`,
    opacity: 0.5,
  },

  variants: {
    focused: {
      true: {
        boxShadow: `0 0 0 2px ${blackA.blackA10}`,
      },
    },

    transparent: {
      true: {
        backgroundColor: "transparent",

        boxShadow: `0 0 0 1px ${blackA.blackA10}`,
      },
    },

    white: {
      true: {
        backgroundColor: "white",
      },
    },
  },
});

const StyledInput = styled("input", {
  all: "unset",
  width: "100%",
  padding: "0.5rem",
  transition: "0.2s",
  fontSize: 16,

  "@bp2": {
    fontSize: 15,
  },

  variants: {
    transparent: {
      true: {
        "&::placeholder": {
          opacity: 0.5,
        },
      },
    },
    search: {
      true: {
        padding: "0",
      },
    },
  },
});

interface InputProps {
  transparent?: boolean;
  white?: boolean;
  autoFocus?: boolean;
  id?: string;
  placeholder?: string;
  value: string;
  type: string;
  ref?: any;
  onChange: (value: string) => void;
}

export const Input = ({
  transparent,
  white,
  autoFocus,
  id = "",
  placeholder = "",
  value,
  type,
  onChange,
}: InputProps) => {
  const [contFocus, setContFocus] = useState(false);
  const [inputVal, setInputVal] = useState(value);

  const isSearch = type === "search";

  useEffect(() => {
    setInputVal(value);
  }, [value]);

  const onInputFocusChange = () => {
    setContFocus(!contFocus);
  };

  const onInputChange = (value: string) => {
    setInputVal(value);
    onChange(value);
  };

  return (
    <InputContainer focused={contFocus} white={white} transparent={transparent}>
      {isSearch && <SearchIcon />}
      <StyledInput
        id={id}
        type={type}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        onFocus={() => onInputFocusChange()}
        onBlur={() => onInputFocusChange()}
        value={inputVal}
        transparent={transparent}
        search={isSearch}
      />
      <ClearIcon onChange={onInputChange} value={inputVal} />
    </InputContainer>
  );
};
