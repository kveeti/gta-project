import { useSelector } from "react-redux";

import CreateButton from "./buttons/createButton";
import ClearButton from "./buttons/clearButton";
import CarInput from "./inputs/carInput";
import GarageInput from "./inputs/garageInput";
import Car from "../cars/car/car";
import GarageNoModify from "../garages/garage/garageNoModify.js";

import { Fade } from "react-awesome-reveal";

const NewCar = () => {
  const chosenGarage = useSelector((state) => state.newCar.chosenGarage);
  const chosenPossibleCar = useSelector(
    (state) => state.newCar.chosenPossibleCar
  );

  return (
    <>
      <div className="card new-card">
        <p className="text-title uppercase">New car</p>
        <div className="new-card-inputs">
          {chosenGarage ? (
            <GarageNoModify garage={chosenGarage} location="chosen-newcar" />
          ) : (
            <Fade>
              <GarageInput />
            </Fade>
          )}

          {chosenPossibleCar ? (
            <Car
              car={chosenPossibleCar}
              carType={"chosen-possiblecar"}
              onClick={true}
            />
          ) : (
            <Fade>
              <CarInput />
            </Fade>
          )}
        </div>

        <div className="new-card-actions">
          <ClearButton />
          <CreateButton />
        </div>
      </div>
    </>
  );
};

export default NewCar;
