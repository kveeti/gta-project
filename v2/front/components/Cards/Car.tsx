import { ICar, ModelCar } from "../../interfaces/Car";
import { useISelector } from "../../state/hooks";
import { Card } from "../Styles/Cards";
import { Text, Title } from "../Styles/Text";
import { SpaceBetween } from "../Styles/Containers";
import { ReactElement } from "react";
import { motion } from "framer-motion";
interface CarPropsBase<T> {
  car: T;
  drag?: boolean;
}

interface CarProps<T> extends CarPropsBase<T> {
  onClick?: (car: T) => any;
}

export function Car(props: CarProps<ICar>): ReactElement;
export function Car(props: CarProps<ModelCar>): ReactElement;

export function Car({ car, onClick, drag }) {
  const checkedCars = useISelector((state) => state.checked.cars);
  const thisChecked = checkedCars.some((checkedCar: ICar) => checkedCar.id === car.id);

  const onCarClick = (e, car) => {
    e.stopPropagation();
    if (onClick) onClick(car);
  };

  return (
    <motion.div drag={drag}>
      <Card red={!!car.reason} checked={thisChecked} onClick={(e) => onCarClick(e, car)}>
        <SpaceBetween>
          <Text>{car.manufacturer}</Text>
          {!!car.garage && <Text>{car.garage.name}</Text>}
        </SpaceBetween>

        <Title>{car.name}</Title>
        <Text>{car.class}</Text>

        {!!car.reason && (
          <Text style={{ paddingTop: "1rem" }}>
            <b>Error:</b> {car.reason}
          </Text>
        )}
      </Card>
    </motion.div>
  );
}
