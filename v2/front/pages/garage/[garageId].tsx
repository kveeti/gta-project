import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { useDispatch } from "react-redux";
import { CarGrid } from "../../components/Cards/Cars/CarGrids";
import { GaragePageCard } from "../../components/Cards/GaragePage/GaragePageCard";
import Layout from "../../components/Layout";
import { Title } from "../../components/Styles/Text";
import { apiBaseUrl } from "../../envs";
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

const garagePage = (props) => {
  const dispatch = useDispatch();

  const garage = props.garage as IGarageDeep;

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <Layout>
      <Div>
        <GaragePageCard garage={garage} />
        <Title>{garage.amountOfCars ? "Cars" : "Garage is empty"}</Title>
        {garage.amountOfCars !== 0 && (
          <CarGrid cars={garage?.cars} onClick={(car) => onCarClick(car)} />
        )}
      </Div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { garageId } = params;

  const token = await getToken({
    // @ts-ignore
    req,
    secret: "doesnt_matter_but_has_to_be_passed_through",
    raw: true,
  });

  const res = await fetch(`${apiBaseUrl}/garages/${garageId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  console.log(data);

  return {
    props: {
      garage: data,
    },
  };
};

export default garagePage;
