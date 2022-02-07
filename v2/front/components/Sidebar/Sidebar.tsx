import { useISelector } from "../../state/hooks";
import { DeleteBtn } from "./Buttons/DeleteBtn";
import { gray } from "@radix-ui/colors";
import { styled } from "../../stitches.config";
import { CheckedCars } from "./CheckedCars/CheckedCars";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { Move } from "./Move/Move";
import { MoveBtn } from "./Buttons/MoveBtn";
import { Text, Title } from "../Styles/Text";

export const StyledSidebar = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
  backgroundColor: "white",
});

export const TopContainer = styled("div", {
  gap: "0.5rem",
  padding: "0.5rem",
  borderBottom: `1px solid ${gray.gray6}`,

  "@mobile": {
    borderBottom: 0,
    padding: "0 0.5rem 0 0.5rem",
    gap: 0,
  },

  variants: {
    paddingBottom: {
      true: {
        paddingBottom: "0.5rem",
      },
    },
  },
});

export const LowerContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflowY: "auto",
  padding: "0.5rem",

  variants: {
    text: {
      true: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
    border: {
      true: {
        borderTop: `1px solid ${gray.gray6}`,
      },
    },
  },
});

export const Sidebar = () => {
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);
  const moveOpen = useISelector((state) => state.move.show);

  const checkedCars = useISelector((state) => state.checked.cars);
  const searchInput = useISelector((state) => state.search.input.value);
  const mobile = useISelector((state) => state.checked.show);

  const showCheckedCars = checkedCars.length > 0;

  const deleteOnClick = () => {
    if (deleteOpen) {
      const carIds = checkedCars.map((car) => car.id);
      dispatch(actions.checked.remove(carIds, searchInput));
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
      <TopContainer
        paddingBottom={moveOpen}
        style={{ marginTop: `${mobile && moveOpen ? "0.5rem" : 0}` }}
      >
        {!mobile && (
          <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
            <DeleteBtn onClick={() => deleteOnClick()} open={deleteOpen} />
            <MoveBtn />
          </div>
        )}

        <Move open={moveOpen} />
      </TopContainer>
      <LowerContainer text={!showCheckedCars} border={mobile && moveOpen}>
        {mobile && <Title style={{ paddingBottom: "0.5rem" }}>Selected cars</Title>}

        {showCheckedCars ? <CheckedCars /> : <Text lessOpaque>Selected cars will appear here</Text>}
      </LowerContainer>
    </StyledSidebar>
  );
};
