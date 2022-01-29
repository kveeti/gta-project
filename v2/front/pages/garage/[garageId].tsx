import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CarGrid } from "../../components/Cards/Cars/CarGrids";
import { GaragePageCard } from "../../components/Cards/GaragePage/GaragePageCard";
import Layout from "../../components/Layout";
import { Title } from "../../components/Styles/Text";
import { ICar } from "../../interfaces/Car";
import { actions } from "../../state/actions";
import { styled } from "../../stitches.config";
import { request } from "../../util/axios";

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

  const [garage, setGarage] = useState(null);

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
          {garage?.cars?.length !== 0 && (
            <CarGrid cars={garage?.cars} onClick={(car) => onCarClick(car)} />
          )}
        </Div>
      )}
    </Layout>
  );
};

export default GaragePage;
