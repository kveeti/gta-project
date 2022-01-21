import { blackA, whiteA } from "@radix-ui/colors";
import { useEffect, useRef, useState } from "react";
import { styled } from "../../stitches.config";
import { ClearIcon } from "./Icons/ClearIcon";
import { SearchIcon } from "./Icons/SearchIcon";
import { ShowIcon } from "./Icons/ShowIcon";

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

  compoundVariants: [
    {
      focused: true,
      transparent: true,

      css: {
        backgroundColor: "transparent",
        boxShadow: `0 0 0 2px ${blackA.blackA10}`,
      },
    },
    {
      focused: true,
      white: true,

      css: {
        backgroundColor: "white",
        boxShadow: `0 0 0 2px ${whiteA.whiteA12}`,
      },
    },
  ],
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
  const input = useRef(null);

  const [showPass, setShowPass] = useState(false);

  const isSearch = type === "search";
  const isPass = type === "password";

  useEffect(() => {
    setInputVal(value);
  }, [value]);

  const onFocus = () => {
    setContFocus(true);
  };

  const onBlur = () => {
    setContFocus(false);
  };

  const onInputChange = (value: string) => {
    setInputVal(value);
    onChange(value);
  };

  const onInputContainerClick = () => {
    if (input.current) input.current.focus();
  };

  const onShowPassClick = () => {
    setShowPass(!showPass);
  };

  return (
    <InputContainer
      focused={contFocus}
      white={white}
      transparent={transparent}
      onClick={() => onInputContainerClick()}
    >
      {isSearch && <SearchIcon />}
      <StyledInput
        ref={input}
        id={id}
        type={showPass && isPass ? "text" : type}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        onFocus={onFocus}
        onBlur={onBlur}
        value={inputVal}
        transparent={transparent}
        search={isSearch}
      />

      {isPass ? (
        inputVal && <ShowIcon id={id} toggled={showPass} onClick={onShowPassClick} />
      ) : (
        <ClearIcon onChange={onInputChange} value={inputVal} />
      )}
    </InputContainer>
  );
};
