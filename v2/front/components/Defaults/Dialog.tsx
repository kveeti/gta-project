import React, { ChangeEvent, useState } from "react";
import { keyframes } from "@stitches/react";
import { blackA, green } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { useISelector } from "../../state/hooks";
import { CarGrid } from "../Cars/Grid";
import { styled } from "../../stitches.config";
import ModelCar from "../Cars/Car/ModelCar";
import { Input } from "semantic-ui-react";
import { NewCarDialogGarage } from "../Garages/Garage/Garage";
import { GarageGrid } from "../Garages/Grid";

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
  transition: "all 0.2s ease-in-out",
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
  maxWidth: "400px",
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

  backgroundColor: green.green4,
  color: green.green11,
  "&:hover": { backgroundColor: green.green5 },
  "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
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
  color: "black",
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",

  "&:hover": { backgroundColor: "$gray200" },
});

const Flex = styled("div", {
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  marginBottom: "1rem",
});

export const NewCarDialog = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(null);

  const newCarState = useISelector((state) => state.newCar);

  const carInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(actions.newCar.set.input.car(input));

    clearTimeout(timer);

    const timeout = setTimeout(() => {
      dispatch(actions.newCar.search.cars(input));
    }, 160);

    setTimer(timeout);
  };

  const garageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(actions.newCar.set.input.garage(input));

    clearTimeout(timer);

    const timeout = setTimeout(() => {
      dispatch(actions.newCar.search.garages(input));
    }, 160);

    setTimer(timeout);
  };

  const saveDisabled = !newCarState.chosenCar || !newCarState.chosenGarage;

  const handleSave = () => {
    if (saveDisabled) return;

    dispatch(actions.newCar.save(newCarState.chosenCar.id, newCarState.chosenGarage.id));
  };

  return (
    <Dialog
      open={newCarState.dialog}
      onOpenChange={(state) => dispatch(actions.newCar.set.dialog(state))}
    >
      <DialogContent>
        <DialogTitle>New Car</DialogTitle>
        <DialogDescription>Save a new car.</DialogDescription>
        <Flex>
          {newCarState.chosenCar ? (
            <ModelCar car={newCarState.chosenCar}></ModelCar>
          ) : (
            <Input
              style={{ width: "100%" }}
              type="text"
              autoComplete="off"
              placeholder="Car"
              value={newCarState.inputs.car}
              onChange={(e) => carInputChange(e)}
              autoFocus
              loading={newCarState.cars.api.loading}
              error={newCarState.cars.api.error}
            />
          )}
        </Flex>
        {newCarState.inputs.car && !newCarState.chosenCar ? (
          <CarGrid cars={newCarState.cars.matching} single model />
        ) : null}
        <Flex>
          {newCarState.chosenGarage ? (
            <NewCarDialogGarage garage={newCarState.chosenGarage} />
          ) : (
            <Input
              style={{ width: "100%" }}
              type="text"
              autoComplete="off"
              placeholder="Garage"
              value={newCarState.inputs.garage}
              onChange={(e) => garageInputChange(e)}
              autoFocus
              loading={newCarState.garages.api.loading}
              error={newCarState.garages.api.error}
            />
          )}
        </Flex>
        {newCarState.inputs.garage && !newCarState.chosenGarage ? (
          <GarageGrid garages={newCarState.garages.matching} single newCar />
        ) : null}
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <Button onClick={() => handleSave()} disabled={saveDisabled}>
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
