import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { Card } from "../../Defaults/Cards";
import { Text, Title } from "../../Defaults/Text";

const ModelCar = ({ car }) => {
  const dispatch = useDispatch();
  const chosenCar = useISelector((state) => state.newCar.chosenCar);

  const handleClick = () => {
    if (chosenCar) return dispatch(actions.newCar.set.chosen.car(null));
    dispatch(actions.newCar.set.chosen.car(car));
  };

  return (
    <Card white onClick={() => handleClick()}>
      <Text>{car.class}</Text>
      <Title>{car.name}</Title>
    </Card>
  );
};

export default ModelCar;
