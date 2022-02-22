import { IGarage, ModelGarage } from "../../interfaces/Garage";
import { Card } from "../Common/Cards";
import { SpaceBetween } from "../Common/Containers";
import { Text, Title } from "../Common/Text";
import { ReactElement, useState } from "react";
import { Chevron } from "../Common/Icons/ChevronRight";
import { styled } from "../../stitches.config";
import { useISelector } from "../../state/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Grid } from "../Common/Grids";
import { Car } from "./Car";
import { ICar } from "../../interfaces/Car";
import { useRouter } from "next/router";
import { FullWidthButton } from "../Common/Buttons";
import { paths } from "../../util/constants";

interface GarageProps<T> {
  garage: T;
  onClick?: (garage: T) => any;
  notAllowed?: boolean;
  showCapacity?: boolean;
  showAlreadyOwned?: boolean;
  showChevron?: boolean;
  open?: boolean;
  children?: ReactElement;
}

const Div = styled("div", {
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
  open,
  children,
}) {
  const checkedCars = useISelector((state) => state.checked.cars);

  const thisChecked = checkedCars.some((car) => car.garage.id === garage.id);

  return (
    <Card checked={thisChecked} notAllowed={notAllowed} onClick={() => onClick(garage)}>
      <SpaceBetween>
        <Div>
          {showCapacity && (
            <Text>
              {garage.cars.length} / {garage.capacity}
            </Text>
          )}
          <Title>{garage.name} </Title>

          <Text>{!!garage?.desc && garage?.desc}</Text>
        </Div>

        {showAlreadyOwned && garage?.alreadyOwned && <Text>Already owned</Text>}

        {showChevron && <Chevron open={open} />}
      </SpaceBetween>

      {children}
    </Card>
  );
}

interface CollapsibleGarageProps {
  garage: IGarage;
  onCarClick?: (car: ICar) => any;
}

export function CollapsibleGarage({ garage, onCarClick }: CollapsibleGarageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onModifyClick = () => {
    router.push(paths.garagePage(garage.id));
  };

  return (
    <Garage
      garage={garage}
      onClick={() => setIsOpen(!isOpen)}
      open={isOpen}
      showCapacity
      showChevron
    >
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <Grid style={{ paddingTop: "1rem" }}>
              <FullWidthButton blue onClick={onModifyClick}>
                Modify
              </FullWidthButton>
              {!!garage?.cars?.length ? (
                garage?.cars?.map((car: any) => (
                  <Car car={car} key={car.id} onClick={(car) => onCarClick && onCarClick(car)} />
                ))
              ) : (
                <Card>
                  <Text>Garage is empty</Text>
                </Card>
              )}
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </Garage>
  );
}
