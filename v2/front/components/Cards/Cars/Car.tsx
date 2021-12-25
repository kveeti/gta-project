import { ICar } from "../../../interfaces/Car";
import { useISelector } from "../../../state/hooks";
import { Card } from "../../Styles/Cards";
import { Text, Title } from "../../Styles/Text";

interface CarProps {
  car: ICar;
  onClick: any;
  wide?: boolean;
}

const Car = ({ car, onClick, wide }: CarProps) => {
  const checkedCars = useISelector((state) => state.checkedCars);

  const checked = checkedCars.includes(car);

  return (
    <Card wide={wide} checked={checked} onClick={() => onClick(car)}>
      <Text>{car.class}</Text>
      <Title>{car.name}</Title>
      {car.garage && <Text>{car.garage.name}</Text>}
    </Card>
  );
};

export default Car;
