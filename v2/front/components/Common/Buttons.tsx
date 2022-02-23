import { blackA, blue, gray, green, red } from "@radix-ui/colors";
import { StyledComponent } from "@stitches/react/types/styled-component";
import { useRouter } from "next/router";
import { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps, FC, HTMLAttributes } from "react";
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

interface BaseButtonProps extends ComponentProps<StyledComponent<"button">> {
  transparent?: boolean;
  gray?: boolean;
  white?: boolean;
  blue?: boolean;
  red?: boolean;
  green?: boolean;
  link?: string;
  as: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

type ButtonProps = Omit<BaseButtonProps, "as">;

const BaseButton: FC<BaseButtonProps> = ({ children, link, onClick, ...rest }) => {
  const router = useRouter();

  return (
    <BaseBtn
      onClick={(e) => {
        onClick && onClick(e);
        link && router.push(link);
      }}
      {...rest}
    >
      <ButtonText>{children}</ButtonText>
    </BaseBtn>
  );
};

export const FullWidthButton: FC<ButtonProps> = ({ children, ...rest }) => (
  <BaseButton {...rest} as={FullWidthButtonStyles}>
    {children}
  </BaseButton>
);

export const PageButton: FC<ButtonProps> = ({ children, ...rest }) => (
  <BaseButton {...rest} as={PageButtonStyles}>
    {children}
  </BaseButton>
);
