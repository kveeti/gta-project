import { QuestionMarkIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../../state/actions";
import { useISelector } from "../../../../../state/hooks";
import { SmallFloatingButton } from "../Styles";

export const FloatingDeleteButton = () => {
  const [activated, setActivated] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const checkedCars = useISelector((state) => state.checked.cars);
  const searchInput = useISelector((state) => state.search.input.value);

  const onClick = () => {
    if (activated) {
      const carIds = checkedCars.map((car) => car.id);
      dispatch(actions.checked.remove(carIds, searchInput));
      setActivated(false);
      if (timer) clearTimeout(timer);
      return;
    }

    setActivated(!activated);

    if (timer) clearTimeout(timer);
    const timeout = setTimeout(() => {
      setActivated(false);
    }, 3000);
    setTimer(timeout);
  };

  return (
    <SmallFloatingButton
      big={activated}
      red
      style={{ marginTop: "1rem" }}
      onClick={() => onClick()}
    >
      {activated ? (
        <QuestionMarkIcon style={{ transform: "scale(1.5)" }} />
      ) : (
        <TrashIcon style={{ transform: "scale(1.5)" }} />
      )}
    </SmallFloatingButton>
  );
};
