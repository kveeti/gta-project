import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Car } from "../../components/Common/Car";
import { GaragePageCard } from "../../components/Cards/GaragePage/GaragePageCard";
import Layout from "../../components/Layouts/Layout";
import { Grid } from "../../components/Common/Grids";
import { Title } from "../../components/Common/Text";
import { ICar } from "../../interfaces/Car";
import { actions } from "../../state/actions";
import { styled } from "../../stitches.config";
import { request } from "../../util/axios";
import { IGarage } from "../../interfaces/Garage";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
  paddingBottom: "0.5rem",
});

const GaragePage = () => {
  if (typeof window == "undefined") return null;

  const dispatch = useDispatch();
  const router = useRouter();
  const { garageId } = router.query;

  const [garage, setGarage] = useState<IGarage | null>(null);

  useEffect(() => {
    const getGarage = async () => {
      const res = await request(`/garages/${garageId}`, "GET");

      if (res) return setGarage(res.data);
    };

    getGarage();
  }, []);

  const onCarClick = (car: ICar) => {
    dispatch(actions.checked.checkCar(car));
  };

  return (
    <Layout title={garage?.name}>
      {garage && (
        <Div>
          <GaragePageCard garage={garage} />
          <Title>{garage?.cars?.length !== 0 && "Cars"}</Title>

          {!!garage?.cars?.length && (
            <Grid>
              {garage.cars.map((car: ICar) => (
                <Car onClick={(car: ICar) => onCarClick(car)} key={car.id} car={car} />
              ))}
            </Grid>
          )}
        </Div>
      )}
    </Layout>
  );
};

export default GaragePage;
