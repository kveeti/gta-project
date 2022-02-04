import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ICar } from "../../../interfaces/Car";
import { actions } from "../../../state/actions";
import { Grid } from "../../Styles/Grid";
import { Text } from "../../Styles/Text";
import { Car } from "../Car";
import { Garage } from "../Garage";

export const Test_2 = ({ garage, cars }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
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
                <Text>Garage is empty</Text>
              )}
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </Garage>
  );
};
