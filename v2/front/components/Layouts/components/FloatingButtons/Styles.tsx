import { blue, red } from "@radix-ui/colors";
import { StyledComponent } from "@stitches/react/types/styled-component";
import { useRouter } from "next/router";
import { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps, FC } from "react";
import { styled } from "../../../../stitches.config";

export const BaseFloatingButton = styled("button", {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "white",
  color: "black",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  transition: "all 0.2s ",

  variants: {
    red: {
      true: {
        backgroundColor: red.red9,
      },
    },
    blue: {
      true: {
        backgroundColor: blue.blue8,
      },
    },
  },
});

export const SmallFloatingButtonStyles = styled(BaseFloatingButton, {
  transform: "scale(0.8)",

  variants: {
    big: {
      true: {
        transform: "scale(1.2)",
      },
    },
  },
});

interface BaseFloatingButtonProps extends ComponentProps<StyledComponent<"button">> {
  red?: boolean;
  blue?: boolean;
  link?: string;
  as: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

type FloatingButtonProps = Omit<BaseFloatingButtonProps, "as">;

export const Base: FC<BaseFloatingButtonProps> = ({ children, link, onClick, ...rest }) => {
  const router = useRouter();

  return (
    <BaseFloatingButton
      {...rest}
      onClick={(e) => {
        onClick && onClick(e);
        link && router.push(link);
      }}
    >
      {children}
    </BaseFloatingButton>
  );
};

export const FloatingButton: FC<FloatingButtonProps> = ({ children, ...rest }) => (
  <Base {...rest} as={BaseFloatingButton}>
    {children}
  </Base>
);

export const SmallFloatingButton: FC<FloatingButtonProps> = ({ children, ...rest }) => (
  <Base {...rest} as={SmallFloatingButtonStyles}>
    {children}
  </Base>
);

export const FloatingButtons = styled("div", {
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",

  width: "60px",

  variants: {
    right: {
      true: {
        bottom: "40px",
        right: "40px",
      },
    },
    left: {
      true: {
        bottom: "40px",
        left: "40px",
      },
    },
  },
});

export const SmallFloatingButtonsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem",
  gap: "0.5rem",
});
