import { useDispatch } from "react-redux";
import { Car } from "../components/Common/Car";
import { CollapsibleGarage } from "../components/Common/Garage";
import { IndexPageCard } from "../components/Cards/IndexPageCard/IndexPageCard";
import Layout from "../components/Layouts/Layout";
import { Grid } from "../components/Common/Grids";
import { Title } from "../components/Common/Text";
import { ICar } from "../interfaces/Car";
import { actions } from "../state/actions";
import { useISelector } from "../state/hooks";
import { styled } from "../stitches.config";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
  paddingTop: "0.5rem",
});

const Index = () => {
  const cars = useISelector((state) => state.users.me?.cars);
  const garages = useISelector((state) => state.users.me?.garages);

  const showCars = cars?.length > 0;
  const showGarages = garages?.length > 0;

  const dispatch = useDispatch();

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <Layout title="Home">
      <IndexPageCard />

      <Div>
        {showGarages && (
          <>
            <Title>Your garages</Title>
            {garages.map((garage) => (
              <CollapsibleGarage key={garage.id} garage={garage} onCarClick={onCarClick} />
            ))}
          </>
        )}

        {showCars && (
          <>
            <Title>Your cars</Title>
            <Grid>
              {cars.map((car: ICar) => (
                <Car onClick={(car: ICar) => onCarClick(car)} key={car.id} car={car} />
              ))}
            </Grid>
          </>
        )}
      </Div>
    </Layout>
  );
};

export default Index;
