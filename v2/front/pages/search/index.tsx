import Head from "next/head";
import { useISelector } from "../../state/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import Layout from "../../components/Layouts/Layout";
import { ICar } from "../../interfaces/Car";
import { IGarage } from "../../interfaces/Garage";
import { Title } from "../../components/Common/Text";
import { styled } from "../../stitches.config";
import { Grid } from "../../components/Common/Grids";
import { Car } from "../../components/Cards/Car";
import { CollapsibleGarage } from "../../components/Cards/Garage";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const SearchPage = () => {
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
        <Div>
          {showGarages && (
            <>
              <Title>Garages</Title>

              {garages?.map((garage: IGarage) => (
                <CollapsibleGarage key={garage.id} garage={garage} onCarClick={onCarClick} />
              ))}
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
