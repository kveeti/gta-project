import { useDispatch } from "react-redux";
import { IGarage } from "../../../interfaces/Garage";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { GarageCard } from "../../Defaults/Cards";
import { Text, Title } from "../../Defaults/Text";

interface GarageProps {
  garage: IGarage;
}

export const Garage = ({ garage }: GarageProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {};

  return (
    <GarageCard onClick={() => handleClick()}>
      <Text>{garage.name}</Text>
    </GarageCard>
  );
};

export const NewCarDialogGarage = ({ garage }: GarageProps) => {
  const dispatch = useDispatch();

  const newCarState = useISelector((state) => state.newCar);

  const handleClick = () => {
    if (garage.full) return;
    if (newCarState.chosenGarage) return dispatch(actions.newCar.set.chosen.garage(null));

    dispatch(actions.newCar.set.chosen.garage(garage));
  };

  return (
    <GarageCard white onClick={() => handleClick()}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: garage.full ? 0.3 : 1,
        }}
      >
        <Title>{garage.name}</Title>
        <Text>
          {garage.amountOfCars} / {garage.capacity}
        </Text>
      </div>
    </GarageCard>
  );
};
