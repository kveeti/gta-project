import { IGarage, ModelGarage } from "../../../interfaces/Garage";
import { styled } from "../../../stitches.config";
import { isTypeModelGarage } from "../../../util/typeguards";
import { Card } from "../../Styles/Cards";
import { Text, Title } from "../../Styles/Text";

interface GarageProps {
  garage: IGarage | ModelGarage;
  onClick?: (garage: IGarage | ModelGarage) => void;
  notAllowed?: boolean;
  showCapacity?: boolean;
  showAlreadyOwned?: boolean;
}

const GarageCard = styled(Card, {
  variants: {
    notAllowed: {
      true: {
        color: "rgba(0,0,0,0.3)",
        cursor: "not-allowed",
      },
    },
  },
});

const Div = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export const Garage = ({
  garage,
  onClick,
  notAllowed,
  showCapacity,
  showAlreadyOwned,
}: GarageProps) => {
  const isModelGarage = isTypeModelGarage(garage);

  if (showCapacity && isModelGarage) {
    console.log("Show capacity is true, but garage is a model garage");
    return null;
  }

  if (showAlreadyOwned && !isModelGarage) {
    console.log("showAlreadyOwned is true, but garage is not a model garage");
    return null;
  }

  return (
    <GarageCard notAllowed={notAllowed} onClick={() => onClick(garage)}>
      <Div>
        <Title>{garage.name}</Title>

        {showCapacity && !isModelGarage && (
          <Text>
            {garage.cars.length} / {garage.capacity}
          </Text>
        )}

        {showAlreadyOwned && isModelGarage && garage.alreadyOwned && <Text>Already owned</Text>}
      </Div>

      {!isModelGarage && <Text>{garage?.desc}</Text>}
    </GarageCard>
  );
};
