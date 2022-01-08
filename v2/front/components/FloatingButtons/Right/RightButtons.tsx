import { useState } from "react";
import { useISelector } from "../../../state/hooks";
import { FloatingButtons, SmallFloatingButtonsContainer } from "../Styles";
import { FloatingDeleteButton } from "./DeleteButton";
import { MainButton } from "./MainButton";
import { FloatingMoveButton } from "./MoveButton";
import { FloatingNewCarButton } from "./NewCarButton";
import { FloatingNewGarageButton } from "./NewGarageButton";

export const RightFloatingButtons = () => {
  const [showBtns, setShowBtns] = useState(false);
  const showSidebar = useISelector((state) => state.checked.show);

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
              <FloatingNewCarButton />
              <FloatingNewGarageButton />
            </>
          )}
        </SmallFloatingButtonsContainer>
      )}
      <MainButton onClick={() => setShowBtns(!showBtns)} />
    </FloatingButtons>
  );
};
