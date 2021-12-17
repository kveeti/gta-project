import { blackA } from "@radix-ui/colors";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
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

  "@media (min-width: 1000px)": {
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
  width: "100%",
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
  fontSize: 15,
  padding: "0.5rem",
  transition: "0.2s",

  "@media (min-width: 1000px)": {
    fontSize: 16,
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
  onChange: any;
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
  ref,
}: InputProps) => {
  const [contFocus, setContFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const isSearch = type === "search";

  const onInputFocusChange = () => {
    setContFocus(!contFocus);
  };

  return (
    <InputContainer focused={contFocus} white={white} transparent={transparent}>
      {isSearch && <SearchIcon />}
      <StyledInput
        ref={inputRef || ref}
        id={id}
        type={type}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        onFocus={() => onInputFocusChange()}
        onBlur={() => onInputFocusChange()}
        value={value}
        transparent={transparent}
        search={isSearch}
      />
      <ClearIcon input={inputRef} />
    </InputContainer>
  );
};
