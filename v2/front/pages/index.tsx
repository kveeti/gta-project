import { useState } from "react";
import { useDispatch } from "react-redux";
import { Car } from "../components/Cards/Car";
import { Test_1 } from "../components/Cards/CollapsibleGarageTest/Test-1";
import { Test_2 } from "../components/Cards/CollapsibleGarageTest/Test-2";
import { Card } from "../components/Cards/EmailVerification/Styles";
import { IndexPageCard } from "../components/Cards/IndexPageCard/IndexPageCard";
import { StyledButton } from "../components/Cards/Signin/Buttons/Styles";
import Layout from "../components/Layout";
import { SingleGrid, Grid } from "../components/Styles/Grid";
import { PageCard } from "../components/Styles/Page-cards";
import { Desc, Title } from "../components/Styles/Text";
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

const Garages = ({ garages, versionOne }) => (
  <SingleGrid noShiftUp>
    {garages?.map((garage: IGarage) =>
      versionOne ? (
        <Test_1 garage={garage} cars={garage.cars} />
      ) : (
        <Test_2 garage={garage} cars={garage.cars} />
      )
    )}
  </SingleGrid>
);

const Cars = ({ cars, onCarClick, dragging }) => (
  <Grid>
    {cars.map((car: ICar) => (
      <Car onClick={(car: ICar) => onCarClick(car)} key={car.id} car={car} drag={dragging} />
    ))}
  </Grid>
);

const Index = () => {
  const [versionOne, setVersionOne] = useState(true);
  const [dragging, setDragging] = useState(false);

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
      <Grid>
        <IndexPageCard />
        <PageCard style={{ alignContent: "space-between" }}>
          <Title>Testing</Title>
          <Desc>Collapsible garage version: {versionOne ? "1" : "2"}</Desc>
          <Desc>Car dragging: {dragging ? "on" : "off"}</Desc>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <StyledButton blue onClick={() => setVersionOne(!versionOne)}>
              Use version {versionOne ? "2" : "1"}
            </StyledButton>

            <StyledButton blue onClick={() => setDragging(!dragging)}>
              Turn {dragging ? "off" : "on"} car dragging
            </StyledButton>
          </div>
        </PageCard>
      </Grid>

      <Div>
        {showGarages && (
          <>
            <Title>Garages</Title>
            <Garages garages={garages} versionOne={versionOne} />
          </>
        )}

        {showCars && (
          <>
            <Title>Cars</Title>
            <Cars cars={cars} onCarClick={onCarClick} dragging={dragging} />
          </>
        )}
      </Div>
    </Layout>
  );
};

export default Index;
