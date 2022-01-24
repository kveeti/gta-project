import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { CarGrid } from "../../components/Cards/Cars/CarGrids";
import { GaragePageCard } from "../../components/Cards/GaragePage/GaragePageCard";
import Layout from "../../components/Layout";
import { Title } from "../../components/Styles/Text";
import { apiBaseUrl, refreshCookieName } from "../../envs";
import { ICar } from "../../interfaces/Car";
import { IGarageDeep } from "../../interfaces/Garage";
import { actions } from "../../state/actions";
import { styled } from "../../stitches.config";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
  paddingBottom: "0.5rem",
});

const GaragePage = (props) => {
  const dispatch = useDispatch();

  const garage = props.garage as IGarageDeep;

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <Layout title={garage.name}>
      <Div>
        <GaragePageCard garage={garage} />
        <Title>{garage.cars.length !== 0 && "Cars"}</Title>
        {garage.cars.length !== 0 && (
          <CarGrid cars={garage?.cars} onClick={(car) => onCarClick(car)} />
        )}
      </Div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { garageId } = params;
  const cookie = req.cookies[refreshCookieName];

  const res = await fetch(`${apiBaseUrl}/garages/${garageId}`, {
    headers: {
      cookie: `${refreshCookieName}=${cookie}`,
    },
  });

  const data = await res.json();

  return {
    props: {
      garage: data,
    },
  };
};

export default GaragePage;
