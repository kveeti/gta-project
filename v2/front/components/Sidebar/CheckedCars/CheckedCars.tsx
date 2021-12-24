import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { CarGrid } from "../../Cards/Cars/CarGrids";

export const CheckedCars = () => {
  const checkedCars = useISelector((state) => state.checked.cars);
  const dispatch = useDispatch();

  const showCheckedCars = checkedCars.length > 0;

  if (!showCheckedCars) return null;

  const onClick = (car) => {
    dispatch(actions.check.car(car));
  };

  return <CarGrid single cars={checkedCars} onClick={(car) => onClick(car)} />;
};
