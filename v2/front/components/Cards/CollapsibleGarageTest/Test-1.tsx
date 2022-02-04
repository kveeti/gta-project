import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ICar } from "../../../interfaces/Car";
import { actions } from "../../../state/actions";
import { Car } from "../Car";
import { Garage } from "../Garage";
import { Grid } from "../../Styles/Grid";
import { Card } from "../../Styles/Cards";
import { Title } from "../../Styles/Text";

export const Test_1 = ({ garage, cars }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <div>
      <motion.div initial={false} onClick={() => setIsOpen(!isOpen)}>
        <Garage garage={garage} onClick={() => null} showCapacity showChevron />
      </motion.div>
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
            {!!garage?.cars?.length ? (
              <Grid style={{ paddingTop: "0.5rem" }}>
                {cars.map((car: any) => (
                  <Car
                    car={car}
                    key={car.id}
                    onClick={(car) => {
                      onCarClick(car);
                    }}
                  />
                ))}
              </Grid>
            ) : (
              <Card style={{ marginTop: "0.5rem" }}>
                <Title>Garage is empty</Title>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
