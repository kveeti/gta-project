import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { Card } from "../Styles/Cards";
import { SpaceBetween } from "../Styles/Containers";
import { Text, Title } from "../Styles/Text";
import { ReactElement } from "react";

interface GarageProps<T> {
  garage: T;
  onClick?: (garage: T) => any;
  notAllowed?: boolean;
  showCapacity?: boolean;
  showAlreadyOwned?: boolean;
  children?: ReactElement;
}

export function Garage(props: GarageProps<IGarage>): ReactElement;
export function Garage(props: GarageProps<ModelGarage>): ReactElement;

export function Garage({ garage, onClick, notAllowed, showCapacity, showAlreadyOwned, children }) {
  return (
    <Card notAllowed={notAllowed} onClick={() => onClick(garage)}>
      <SpaceBetween>
        <Title>{garage.name}</Title>

        {showCapacity && (
          <Text>
            {garage.cars.length} / {garage.capacity}
          </Text>
        )}

        {showAlreadyOwned && garage?.alreadyOwned && <Text>Already owned</Text>}
      </SpaceBetween>

      <Text>{!!garage?.desc && garage?.desc}</Text>

      {children}
    </Card>
  );
}
