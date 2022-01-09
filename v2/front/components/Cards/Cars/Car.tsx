import { ICar } from "../../../interfaces/Car";
import { useISelector } from "../../../state/hooks";
import { Card } from "../../Styles/Cards";
import { Text, Title } from "../../Styles/Text";

interface CarProps {
  car: ICar;
  onClick: any;
}

const Car = ({ car, onClick }: CarProps) => {
  const checkedCars = useISelector((state) => state.checked.cars);

  const checked = checkedCars.some((checkedCar) => checkedCar.id === car.id);

  return (
    <Card red={car.reason && true} checked={checked} onClick={() => onClick(car)}>
      <Text>{car.class}</Text>
      <Title>{car.name}</Title>
      {car.garage && <Text>{car.garage.name}</Text>}

      {car.reason && (
        <Text style={{ paddingTop: "1rem" }}>
          <b>Error:</b> {car.reason}
        </Text>
      )}
    </Card>
  );
};

export default Car;
