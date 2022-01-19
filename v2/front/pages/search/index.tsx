import { useISelector } from "../../state/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { CarGrid } from "../../components/Cards/Cars/CarGrids";
import Layout from "../../components/Layout";
import { ICar } from "../../interfaces/Car";
import { SearchGarageGrid } from "../../components/Cards/Garages/GarageGrid";
import { IGarage } from "../../interfaces/Garage";
import { Title } from "../../components/Styles/Text";
import { styled } from "../../stitches.config";
import Head from "next/head";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
  paddingBottom: "0.5rem",
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
  }, [router.query.q]);

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  const onGarageClick = (garage: IGarage) => {
    console.log("click");

    router.push(`/garage/${garage.id}`, `/garage/${garage.id}`, { shallow: true });
  };

  return (
    <>
      <Head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <Layout title={"Search"}>
        {showGarages && (
          <Div>
            <Title>Garages</Title>
            <SearchGarageGrid garages={garages} onClick={(garage) => onGarageClick(garage)} />
          </Div>
        )}
        {showCars && (
          <Div>
            <Title>Cars</Title>
            <CarGrid cars={cars} onClick={(car) => onCarClick(car)} />
          </Div>
        )}
      </Layout>
    </>
  );
};

export default SearchPage;
