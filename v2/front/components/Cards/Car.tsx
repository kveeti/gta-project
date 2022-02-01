import { ICar, ModelCar } from "../../interfaces/Car";
import { useISelector } from "../../state/hooks";
import { Card } from "../Styles/Cards";
import { Text, Title } from "../Styles/Text";
import { SpaceBetween } from "../Styles/Containers";
import { isTypeICar } from "../../util/typeguards";
interface CarProps {
  car: ICar | ModelCar;
  onClick: any;
}

export const Car = ({ car, onClick }: CarProps) => {
  if (isTypeICar(car)) {
    const checkedCars = useISelector((state) => state.checked.cars);
    const thisChecked = checkedCars.some((checkedCar) => checkedCar.id === car.id);

    return (
      <Card red={!!car.reason} checked={thisChecked} onClick={() => onClick(car)}>
        <SpaceBetween>
          <Text>{car.manufacturer}</Text>
          {car.garage && <Text>{car.garage.name}</Text>}
        </SpaceBetween>
        <Title>{car.name}</Title>
        <Text>{car.class}</Text>

        {car.reason && (
          <Text style={{ paddingTop: "1rem" }}>
            <b>Error:</b> {car.reason}
          </Text>
        )}
      </Card>
    );
  }

  return (
    <Card>
      <Title>{car.name}</Title>
      <Text>{car.class}</Text>
    </Card>
  );
};
