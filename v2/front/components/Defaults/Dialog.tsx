import React, { ChangeEvent } from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA, mauve, green } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { useISelector } from "../../state/hooks";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },

  "&:focus": { outline: "none" },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: "black",
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  color: "black",
  fontSize: 15,
  margin: "1rem 0 !important",
});

const Dialog = DialogPrimitive.Root;
const DialogContent = Content;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

const Flex = styled("div", { display: "flex" });

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: "pointer",

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: "black",
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 15,
});

const Input = styled("input", {
  all: "unset",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 1rem",
  fontSize: 15,
  lineHeight: 1,
  color: "black",
  boxShadow: `0 0 0 1px ${"gray"}`,
  height: 35,

  "&::placeholder": {
    opacity: 0.5,
  },

  "&:focus": { boxShadow: `0 0 0 2px ${"black"}` },
});

export const NewCarDialog = () => {
  const dispatch = useDispatch();

  const openState = useISelector((state) => state.newCar.dialog);

  const carInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(actions.newCar.set.input.car(input));

    if (!input) return dispatch(actions.newCar.set.model.cars.matching([]));

    dispatch(actions.newCar.search.modelCars(e.target.value));
  };

  const garageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.newCar.set.input.garage(e.target.value));
  };

  return (
    <Dialog open={openState} onOpenChange={(state) => dispatch(actions.newCar.set.dialog(state))}>
      <DialogContent>
        <DialogTitle>New Car</DialogTitle>
        <DialogDescription>Save a new car to one of your garages.</DialogDescription>
        <Fieldset>
          <Input placeholder="Name" onChange={(e) => carInputChange(e)} />
        </Fieldset>
        <Fieldset>
          <Input placeholder="Garage" onChange={(e) => garageInputChange(e)} />
        </Fieldset>
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <Button aria-label="Create" variant="green">
              Save
            </Button>
          </DialogClose>
        </Flex>
        <DialogClose asChild>
          <IconButton>
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
