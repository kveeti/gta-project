import { useDispatch } from "react-redux";
import { ICar } from "../../../../../interfaces/Car";
import { actions } from "../../../../../state/actions";
import { useISelector } from "../../../../../state/hooks";
import { Car } from "../../../../Cards/Car";
import { SingleGrid } from "../../../../Common/Grids";

export const CheckedCars = () => {
  const checkedCars = useISelector((state) => state.checked.cars);
  const dispatch = useDispatch();

  const showCheckedCars = checkedCars.length > 0;

  if (!showCheckedCars) return null;

  const onCarClick = (car) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <SingleGrid noShiftUp>
      {checkedCars.map((car: ICar) => (
        <Car onClick={(car: ICar) => onCarClick(car)} key={car.id} car={car} />
      ))}
    </SingleGrid>
  );
};
