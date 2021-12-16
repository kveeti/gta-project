import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { Card } from "../../../Styles/Cards";
import { Text, Title } from "../../../Styles/Text";

const Car = ({ car, onClick }) => {
  const dispatch = useDispatch();

  const checkedCars = useISelector((state) => state.checked.cars);

  const handleClick = () => {
    dispatch(actions.check.car(car));
  };

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
