import { blackA, blue, gray, green, red } from "@radix-ui/colors";
import { styled } from "../../stitches.config";
import { ButtonText } from "./Text";

export const BaseBtn = styled("button", {
  all: "unset",
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: 3,
  transition: "0.2s all",

  variants: {
    disabled: {
      true: {
        opacity: 0.3,
        cursor: "not-allowed",

        "&:focus:not(:focus-visible)": {
          outline: "none",
          boxShadow: "none",
        },
      },
    },
    transparent: {
      true: {
        backgroundColor: "transparent",

        "&:focus": { backgroundColor: blackA.blackA9 },
        "&:hover": { backgroundColor: blackA.blackA9 },
      },
    },
    gray: {
      true: {
        backgroundColor: gray.gray6,
        color: gray.gray12,

        "&:focus": { boxShadow: `0 0 0 2px ${gray.gray9}` },
        "&:hover": { backgroundColor: gray.gray7 },
      },
    },
    white: {
      true: {
        backgroundColor: "white",
        color: "black",

        "&:focus": { boxShadow: `0 0 0 2px ${gray.gray6}` },
        "&:hover": { backgroundColor: gray.gray5 },
      },
    },
    blue: {
      true: {
        backgroundColor: blue.blue5,
        color: blue.blue11,

        "&:focus": { boxShadow: `0 0 0 2px ${blue.blue6}` },
        "&:hover": { backgroundColor: blue.blue6 },
      },
    },
    red: {
      true: {
        backgroundColor: red.red7,
        color: blackA.blackA12,

        "&:hover": { backgroundColor: red.red8 },
        "&:focus": { boxShadow: `0 0 0 2px ${red.red8}` },
      },
    },
    green: {
      true: {
        backgroundColor: green.green5,
        color: green.green11,

        "&:hover": { backgroundColor: green.green6 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green6}` },
      },
    },
  },
});

const FullWidthButtonStyles = styled(BaseBtn, {
  width: "100%",
  minHeight: "2.5rem",
  fontSize: "1.1rem",
});

const PageButtonStyles = styled(BaseBtn, {
  padding: "0 2rem",
  height: "100%",
});

export const FullWidthButton = ({ children, ...rest }) => (
  <FullWidthButtonStyles {...rest}>
    <ButtonText>{children}</ButtonText>
  </FullWidthButtonStyles>
);

export const PageButton = ({ children, ...rest }) => (
  <PageButtonStyles {...rest}>
    <ButtonText>{children}</ButtonText>
  </PageButtonStyles>
);
