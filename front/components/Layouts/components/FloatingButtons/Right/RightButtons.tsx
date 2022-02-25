import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../../state/actions";
import { useISelector } from "../../../../../state/hooks";
import { FloatingButtons, SmallFloatingButtonsContainer } from "../Styles";
import { FloatingDeleteButton } from "./DeleteButton";
import { MainButton } from "./MainButton";
import { FloatingMoveButton } from "./MoveButton";
import { FloatingNewCarButton } from "./NewCarButton";
import { FloatingNewGarageButton } from "./NewGarageButton";

export const RightFloatingButtons = () => {
  const dispatch = useDispatch();

  const [showBtns, setShowBtns] = useState(false);
  const showSidebar = useISelector((state) => state.checked.show);

  const me = useISelector((state) => state.users.me);

  useEffect(() => {
    if (me?.owner) return;

    dispatch(actions.users.get.me());
  }, []);

  return (
    <FloatingButtons right>
      {showBtns && (
        <SmallFloatingButtonsContainer>
          {showSidebar ? (
            <>
              <FloatingDeleteButton />
              <FloatingMoveButton />
            </>
          ) : (
            <>
              {me?.garageCount !== 0 && <FloatingNewCarButton />}
              <FloatingNewGarageButton />
            </>
          )}
        </SmallFloatingButtonsContainer>
      )}
      <MainButton onClick={() => setShowBtns(!showBtns)} />
    </FloatingButtons>
  );
};
