import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ICar } from "../../../interfaces/Car";
import { actions } from "../../../state/actions";
import { Grid } from "../../Styles/Grid";
import { Car } from "../Car";
import { Garage } from "../Garage";

export const Test_2 = ({ garage, cars }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <motion.div initial={false} onClick={() => setIsOpen(!isOpen)}>
      <Garage garage={garage} onClick={() => null} showCapacity>
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
                {cars.map((car: any) => (
                  <Car
                    car={car}
                    onClick={(car) => {
                      onCarClick(car);
                    }}
                  />
                ))}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </Garage>
    </motion.div>
  );
};
