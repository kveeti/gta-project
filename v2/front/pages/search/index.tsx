import Head from "next/head";
import { useISelector } from "../../state/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import Layout from "../../components/Layout";
import { ICar } from "../../interfaces/Car";
import { IGarage } from "../../interfaces/Garage";
import { Desc, Title } from "../../components/Styles/Text";
import { styled } from "../../stitches.config";
import { Grid, SingleGrid } from "../../components/Styles/Grid";
import { Car } from "../../components/Cards/Car";
import { Test_1 } from "../../components/Cards/CollapsibleGarageTest/Test-1";
import { Test_2 } from "../../components/Cards/CollapsibleGarageTest/Test-2";
import { PageCard } from "../../components/Styles/Page-cards";
import { StyledButton } from "../../components/Cards/Signin/Buttons/Styles";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
  paddingTop: "0.5rem",
});

const SearchPage = () => {
  const [versionOne, setVersionOne] = useState(true);

  const cars = useISelector((state) => state.search.cars);
  const garages = useISelector((state) => state.search.garages);

  const showCars = cars?.length > 0;
  const showGarages = garages?.length > 0;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.q !== "string") return;

    dispatch(actions.search.set.input(router.query.q));
    dispatch(actions.search.search(router.query.q));

    return () => {
      dispatch(actions.search.set.garages([]));
      dispatch(actions.search.set.cars([]));
    };
  }, [router.query.q]);

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <Layout title={"Search"}>
        <PageCard style={{ alignContent: "space-between" }}>
          <Title>Testing</Title>
          <Desc>Collapsible garage version: {versionOne ? "1" : "2"}</Desc>

          <StyledButton blue onClick={() => setVersionOne(!versionOne)}>
            Use version {versionOne ? "2" : "1"}
          </StyledButton>
        </PageCard>
        <Div>
          {showGarages && (
            <>
              <Title>Garages</Title>

              <SingleGrid noShiftUp>
                {garages?.map((garage: IGarage) =>
                  versionOne ? (
                    <Test_1 garage={garage} cars={garage.cars} />
                  ) : (
                    <Test_2 garage={garage} cars={garage.cars} />
                  )
                )}
              </SingleGrid>
            </>
          )}

          {showCars && (
            <>
              <Title>Cars</Title>

              <Grid>
                {cars.map((car: ICar) => (
                  <Car onClick={(car: ICar) => onCarClick(car)} key={car.id} car={car} />
                ))}
              </Grid>
            </>
          )}
        </Div>
      </Layout>
    </>
  );
};

export default SearchPage;
