import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { Card } from "../Styles/Cards";
import { SpaceBetween } from "../Styles/Containers";
import { Text, Title } from "../Styles/Text";
import { ReactElement, useState } from "react";
import { Chevron } from "../Icons/ChevronRight";
import { styled } from "../../stitches.config";
import { useISelector } from "../../state/hooks";

interface GarageProps<T> {
  garage: T;
  onClick?: (garage: T) => any;
  notAllowed?: boolean;
  showCapacity?: boolean;
  showAlreadyOwned?: boolean;
  showChevron?: boolean;
  children?: ReactElement;
}

const TestDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export function Garage(props: GarageProps<IGarage>): ReactElement;
export function Garage(props: GarageProps<ModelGarage>): ReactElement;

export function Garage({
  garage,
  onClick,
  notAllowed,
  showCapacity,
  showAlreadyOwned,
  showChevron,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const checkedCars = useISelector((state) => state.checked.cars);

  const thisChecked = checkedCars.some((car) => car.garage.id === garage.id);

  const onGarageClick = (garage) => {
    onClick(garage);
    setIsOpen(!isOpen);
  };

  return (
    <Card checked={thisChecked} notAllowed={notAllowed} onClick={() => onGarageClick(garage)}>
      <SpaceBetween>
        <TestDiv>
          {showCapacity && (
            <Text>
              {garage.cars.length} / {garage.capacity}
            </Text>
          )}
          <Title>{garage.name} </Title>

          <Text>{!!garage?.desc && garage?.desc}</Text>
        </TestDiv>

        {showAlreadyOwned && garage?.alreadyOwned && <Text>Already owned</Text>}

        {showChevron && <Chevron open={isOpen} />}
      </SpaceBetween>

      {children}
    </Card>
  );
}
