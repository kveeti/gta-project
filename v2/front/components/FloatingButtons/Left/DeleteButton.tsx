import { TrashIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { FloatingButton } from "../Styles";

export const DeleteButton = ({}) => {
  const [activated, setActivated] = useState(false);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const checkedCars = useISelector((state) => state.checkedCars);
  const searchInput = useISelector((state) => state.search.input.value);

  const onClick = () => {
    if (activated) {
      dispatch(actions.checkedCars.remove(checkedCars, searchInput));
      setActivated(false);
      return clearTimeout(timer);
    }

    setActivated(!activated);

    clearTimeout(timer);
    const timeout = setTimeout(() => {
      setActivated(false);
    }, 3000);
    setTimer(timeout);
  };

  return (
    <FloatingButton big={activated} red style={{ marginTop: "1rem" }} onClick={() => onClick()}>
      {activated ? (
        <QuestionMarkIcon style={{ transform: "scale(1.5)" }} />
      ) : (
        <TrashIcon style={{ transform: "scale(1.4)" }} />
      )}
    </FloatingButton>
  );
};
