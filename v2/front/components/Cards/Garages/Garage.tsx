import { useDispatch } from "react-redux";
import { IGarage } from "../../../interfaces/Garage";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { Card } from "../../Styles/Cards";
import { Text, Title } from "../../Styles/Text";

interface GarageProps {
  garage: IGarage;
  onClick: any;
}

const GarageCard = styled(Card, {
  flexDirection: "row",
  justifyContent: "space-between",

  variants: {
    full: {
      true: {
        color: "rgba(0,0,0,0.3)",
        cursor: "not-allowed",
      },
    },
  },
});

export const Garage = ({ garage, onClick }: GarageProps) => {
  return (
    <GarageCard full={garage.full} onClick={() => onClick(garage)}>
      <Text>{garage.name}</Text>

      {garage.capacity && (
        <Text>
          {garage.amountOfCars} / {garage.capacity}
        </Text>
      )}
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
    <Card white onClick={() => handleClick()}>
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
    </Card>
  );
};
