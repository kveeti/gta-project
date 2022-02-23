import { useISelector } from "../../../../state/hooks";
import { DeleteBtn } from "./Buttons/DeleteBtn";
import { CheckedCars } from "./CheckedCars/CheckedCars";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { Move } from "./Move/Move";
import { MoveBtn } from "./Buttons/MoveBtn";
import { Text, Title } from "../../../Common/Text";
import { StyledSidebar, TopContainer, LowerContainer } from "./Styles";

export const Sidebar = () => {
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState<NodeJS.Timeout | null>(null);
  const moveOpen = useISelector((state) => state.move.show);

  const checkedCars = useISelector((state) => state.checked.cars);
  const searchInput = useISelector((state) => state.search.input.value);
  const sidebarIsOnlyVisible = useISelector((state) => state.checked.show); // will be only visible on mobile

  const showCheckedCars = checkedCars.length > 0;

  const deleteOnClick = () => {
    if (deleteOpen) {
      const carIds = checkedCars.map((car) => car.id);
      dispatch(actions.checked.remove(carIds, searchInput));
      setDeleteOpen(false);
      if (deleteTimer) clearTimeout(deleteTimer);
      return;
    }

    setDeleteOpen(!deleteOpen);

    if (deleteTimer) clearTimeout(deleteTimer);
    const timer = setTimeout(() => {
      setDeleteOpen(false);
    }, 2000);
    setDeleteTimer(timer);
  };

  return (
    <StyledSidebar>
      <TopContainer paddingBottom={moveOpen}>
        {!sidebarIsOnlyVisible && (
          <div style={{ display: "flex", width: "100%", gap: "0.5rem" }}>
            <DeleteBtn onClick={() => deleteOnClick()} open={deleteOpen} />
            <MoveBtn />
          </div>
        )}
        <Move open={moveOpen} />
        {sidebarIsOnlyVisible && <Title style={{ marginTop: "0.5rem" }}>Selected cars</Title>}
      </TopContainer>
      <LowerContainer text={!showCheckedCars}>
        {showCheckedCars ? <CheckedCars /> : <Text lessOpaque>Selected cars will appear here</Text>}
      </LowerContainer>
    </StyledSidebar>
  );
};
