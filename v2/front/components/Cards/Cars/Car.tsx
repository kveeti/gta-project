import { ICar } from "../../../interfaces/Car";
import { useISelector } from "../../../state/hooks";
import { Card } from "../../Styles/Cards";
import { Text, Title } from "../../Styles/Text";

interface CarProps {
  car: ICar;
  onClick: any;
}

const Car = ({ car, onClick }: CarProps) => {
  const checkedCars = useISelector((state) => state.checkedCars);

  const checked = checkedCars.includes(car);

  return (
    <Card checked={checked} onClick={() => onClick(car)}>
      <Text>{car.class}</Text>
      <Title>{car.name}</Title>
      {car.garage && <Text>{car.garage.name}</Text>}
    </Card>
  );
};

export default Car;
