import { useDispatch } from "react-redux";
import { IGarage } from "../../../interfaces/Garage";
import { styled } from "../../../stitches.config";
import { Card } from "../../Styles/Cards";
import { Text } from "../../Styles/Text";

interface GarageProps {
  garage: IGarage;
  onClick: any;
  wide?: boolean;
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

export const Garage = ({ garage, onClick, wide }: GarageProps) => {
  const showNumbers = typeof garage.amountOfCars !== "undefined" && garage.amountOfCars >= 0;

  return (
    <GarageCard wide={wide} full={garage.full} onClick={() => onClick(garage)}>
      <Text>{garage.name}</Text>

      {showNumbers && (
        <Text>
          {garage.amountOfCars} / {garage.capacity}
        </Text>
      )}
    </GarageCard>
  );
};
