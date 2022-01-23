import { ICar } from "../../../interfaces/Car";
import { useISelector } from "../../../state/hooks";
import { Card } from "../../Styles/Cards";
import { Text, Title } from "../../Styles/Text";
import { styled } from "../../../stitches.config";

interface CarProps {
  car: ICar;
  onClick: any;
}

const Div = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

const Car = ({ car, onClick }: CarProps) => {
  const checkedCars = useISelector((state) => state.checked.cars);

  const checked = checkedCars.some((checkedCar) => checkedCar.id === car.id);

  return (
    <Card red={car.reason && true} checked={checked} onClick={() => onClick(car)}>
      <Div>
        <Text>{car.manufacturer}</Text>
        {car.garage && <Text>{car.garage.name}</Text>}
      </Div>
      <Title>{car.name}</Title>
      <Text>{car.class}</Text>

      {car.reason && (
        <Text style={{ paddingTop: "1rem" }}>
          <b>Error:</b> {car.reason}
        </Text>
      )}
    </Card>
  );
};

export default Car;
