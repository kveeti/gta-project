import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ICar } from "../../../interfaces/Car";
import { actions } from "../../../state/actions";
import { Card } from "../../Styles/Cards";
import { Grid } from "../../Styles/Grid";
import { PageButton, PageCard } from "../../Styles/Page-cards";
import { Text } from "../../Styles/Text";
import { Car } from "../Car";
import { Garage } from "../Garage";

export const Test_2 = ({ garage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  const onModifyClick = () => {
    router.push(`/garage/${garage.id}`, `/garage/${garage.id}`, { shallow: true });
  };

  return (
    <Garage garage={garage} onClick={() => setIsOpen(!isOpen)} showCapacity showChevron>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="test"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <Grid style={{ paddingTop: "1rem" }}>
              <PageButton blue onClick={onModifyClick}>
                Modify
              </PageButton>
              {!!garage?.cars?.length ? (
                garage?.cars?.map((car: any) => (
                  <Car
                    car={car}
                    key={car.id}
                    onClick={(car) => {
                      onCarClick(car);
                    }}
                  />
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
};
