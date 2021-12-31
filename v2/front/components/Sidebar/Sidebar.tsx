import { useISelector } from "../../state/hooks";
import { DeleteBtn } from "./Buttons/DeleteBtn";
import { MoveBtn } from "./Buttons/MoveBtn";
import { gray } from "@radix-ui/colors";
import { styled } from "../../stitches.config";
import { CheckedCars } from "./CheckedCars/CheckedCars";
import { Text } from "../Styles/Text";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";

export const StyledSidebar = styled("div", {
  height: "100%",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
  backgroundColor: "white",
});

export const Buttons = styled("div", {
  display: "flex",
  gap: "0.5rem",
  padding: "0.5rem",

  borderBottom: `1px solid ${gray.gray6}`,
});

export const LowerContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "0.5rem",
  overflowY: "auto",

  variants: {
    text: {
      true: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

export const Sidebar = () => {
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

  const checkedCars = useISelector((state) => state.checkedCars);
  const searchInput = useISelector((state) => state.search.input.value);

  const showCheckedCars = checkedCars.length > 0;

  const deleteOnClick = () => {
    if (deleteOpen) {
      dispatch(actions.checkedCars.remove(checkedCars, searchInput));
      setDeleteOpen(false);
      return clearTimeout(deleteTimer);
    }

    setDeleteOpen(!deleteOpen);

    clearTimeout(deleteTimer);
    const timer = setTimeout(() => {
      setDeleteOpen(false);
    }, 2000);
    setDeleteTimer(timer);
  };

  return (
    <StyledSidebar>
      <Buttons>
        <DeleteBtn onClick={() => deleteOnClick()} open={deleteOpen} />
        {!deleteOpen && <MoveBtn />}
      </Buttons>
      <LowerContainer text={!showCheckedCars}>
        {showCheckedCars ? <CheckedCars /> : <Text lessOpaque>Selected cars will appear here</Text>}
      </LowerContainer>
    </StyledSidebar>
  );
};
