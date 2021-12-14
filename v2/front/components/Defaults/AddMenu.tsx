import React from "react";
import { styled, keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { FloatingButton } from "./Styles/Buttons";
import { Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const itemStyles = {
  all: "unset",
  fontSize: 14,
  lineHeight: 1,
  color: "black",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 30,
  padding: "0 5px",
  position: "relative",
  userSelect: "none",

  "&:focus": {
    backgroundColor: "$card",
    color: "$text",
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = StyledContent;
const DropdownMenuItem = StyledItem;

const AddMenu = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <FloatingButton right>
            <Icon name="plus" style={{ margin: "0" }} />
          </FloatingButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuItem
            onClick={() => {
              dispatch(actions.newCar.set.dialog(true));
            }}
          >
            New Car
          </DropdownMenuItem>
          <DropdownMenuItem>New Garage</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AddMenu;
