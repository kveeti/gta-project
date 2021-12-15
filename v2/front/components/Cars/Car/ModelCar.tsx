import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { CarCard } from "../../Defaults/Cards";
import { Text, Title } from "../../Defaults/Text";

const ModelCar = ({ car }) => {
  const dispatch = useDispatch();
  const chosenCar = useISelector((state) => state.newCar.chosenCar);

  const handleClick = () => {
    if (chosenCar) return dispatch(actions.newCar.set.chosen.car(null));
    dispatch(actions.newCar.set.chosen.car(car));
  };

  return (
    <CarCard model onClick={() => handleClick()}>
      <Text>{car.class}</Text>
      <Title>{car.name}</Title>
    </CarCard>
  );
};

export default ModelCar;
