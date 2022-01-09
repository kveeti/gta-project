import { IGarage, ModelGarage } from "../../../interfaces/Garage";
import { styled } from "../../../stitches.config";
import { isModelGarage } from "../../../util/typeguards";
import { Card } from "../../Styles/Cards";
import { Text } from "../../Styles/Text";

interface GarageProps {
  garage: IGarage | ModelGarage;
  onClick?: (garage: IGarage | ModelGarage) => void;
  notAllowed?: boolean;
  showCapacity?: boolean;
  showAlreadyOwned?: boolean;
}

const GarageCard = styled(Card, {
  flexDirection: "row",
  justifyContent: "space-between",

  variants: {
    notAllowed: {
      true: {
        color: "rgba(0,0,0,0.3)",
        cursor: "not-allowed",
      },
    },
  },
});

export const Garage = ({
  garage,
  onClick,
  notAllowed,
  showCapacity,
  showAlreadyOwned,
}: GarageProps) => {
  const isGarage = isModelGarage(garage);

  if (showCapacity && isGarage) {
    console.log("Show capacity is true, but garage is a model garage");
    return null;
  }

  if (showAlreadyOwned && !isGarage) {
    console.log("showAlreadyOwned is true, but garage is not a model garage");
    return null;
  }

  return (
    <GarageCard notAllowed={notAllowed} onClick={() => onClick(garage)}>
      <Text>{garage.name}</Text>

      {showCapacity && !isGarage && (
        <Text>
          {garage.amountOfCars} / {garage.capacity}
        </Text>
      )}

      {showAlreadyOwned && isGarage && garage.alreadyOwned && <Text>Already owned</Text>}
    </GarageCard>
  );
};
