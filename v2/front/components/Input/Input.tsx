import { blackA, red, whiteA } from "@radix-ui/colors";
import { useEffect, useRef, useState } from "react";
import { styled } from "../../stitches.config";
import { ClearIcon } from "./Icons/ClearIcon";
import { SearchIcon } from "./Icons/SearchIcon";
import { ShowIcon } from "./Icons/ShowIcon";

const InputContainer = styled("div", {
  minHeight: 38,
  display: "flex",
  alignItems: "center",
  backgroundColor: "White",
  borderRadius: 4,
  transition: "0.2s",
  boxShadow: "0 0 0 1px rgb(204, 204, 204)",

  "&:disabled": {
    boxShadow: `0 0 0 1px ${blackA.blackA7}`,
    opacity: 0.5,
  },

  variants: {
    focused: {
      true: {
        boxShadow: `0 0 0 2px ${blackA.blackA9}`,
      },
    },
    white: {
      true: {
        backgroundColor: "white",
      },
    },
    maxHeight: {
      true: {
        height: "100%",
      },
    },
  },

  compoundVariants: [
    {
      focused: true,

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
        boxShadow: `0 0 0 1px ${whiteA.whiteA12}`,
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

  variants: {
    search: {
      true: {
        padding: "0",
      },
    },
  },
});

interface InputProps {
  maxHeight?: boolean;
  white?: boolean;
  id?: string;
  autoFocus?: boolean;
  placeholder?: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  required?: boolean;
}

export const Input = ({
  maxHeight,
  white,
  id = "",
  autoFocus,
  placeholder = "",
  value,
  type,
  onChange,
  onBlur,
  onFocus,
  required,
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

  const onInputFocus = () => {
    setContFocus(true);
    onFocus && onFocus();
  };

  const onInputBlur = () => {
    setContFocus(false);
    onBlur && onBlur();
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
      onClick={() => onInputContainerClick()}
      maxHeight={maxHeight}
    >
      {isSearch && <SearchIcon />}
      <StyledInput
        ref={input}
        id={id}
        required={required}
        autoFocus={autoFocus}
        type={showPass && isPass ? "text" : type}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        value={inputVal}
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
