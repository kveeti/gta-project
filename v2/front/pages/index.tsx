import { useDispatch } from "react-redux";
import { Car } from "../components/Cards/Car";
import { Test_1 } from "../components/Cards/CollapsibleGarageTest/Test-1";
import { Test_2 } from "../components/Cards/CollapsibleGarageTest/Test-2";
import { IndexPageCard } from "../components/Cards/IndexPageCard/IndexPageCard";
import Layout from "../components/Layout";
import { SingleGrid, Grid } from "../components/Styles/Grid";
import { Title } from "../components/Styles/Text";
import { ICar } from "../interfaces/Car";
import { IGarage } from "../interfaces/Garage";
import { actions } from "../state/actions";
import { useISelector } from "../state/hooks";
import { styled } from "../stitches.config";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
  paddingTop: "0.5rem",
});

const Garages = ({ garages }) => (
  <SingleGrid noShiftUp>
    {garages?.map((garage: IGarage) => (
      <Test_1 garage={garage} cars={garage.cars} />
      //<Test_2 garage={garage} cars={garage.cars} />
    ))}
  </SingleGrid>
);

const Cars = ({ cars, onCarClick }) => (
  <Grid>
    {cars.map((car: ICar) => (
      <Car onClick={(car: ICar) => onCarClick(car)} key={car.id} car={car} />
    ))}
  </Grid>
);

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
            <Title>Garages</Title>
            <Garages garages={garages} />
          </>
        )}

        {showCars && (
          <>
            <Title>Cars</Title>
            <Cars cars={cars} onCarClick={onCarClick} />
          </>
        )}
      </Div>
    </Layout>
  );
};

export default Index;
