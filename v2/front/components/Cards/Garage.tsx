import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { isTypeModelGarage } from "../../util/typeguards";
import { Card } from "../Styles/Cards";
import { SpaceBetween } from "../Styles/Containers";
import { Text, Title } from "../Styles/Text";

interface GarageProps {
  garage: IGarage | ModelGarage;
  onClick?: (garage: IGarage | ModelGarage) => void;
  notAllowed?: boolean;
  showCapacity?: boolean;
  showAlreadyOwned?: boolean;
}

export const Garage = ({
  garage,
  onClick,
  notAllowed,
  showCapacity,
  showAlreadyOwned,
}: GarageProps) => {
  const isModelGarage = isTypeModelGarage(garage);

  return (
    <Card notAllowed={notAllowed} onClick={() => onClick(garage)}>
      <SpaceBetween>
        <Title>{garage.name}</Title>

        {showCapacity && !isModelGarage && (
          <Text>
            {garage.cars.length} / {garage.capacity}
          </Text>
        )}

        {showAlreadyOwned && isModelGarage && garage.alreadyOwned && <Text>Already owned</Text>}
      </SpaceBetween>

      {!isModelGarage && <Text>{garage?.desc}</Text>}
    </Card>
  );
};
