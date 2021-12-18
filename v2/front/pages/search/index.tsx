import { useISelector } from "../../state/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { CarGrid } from "../../components/Cards/Cars/Grid";
import Layout from "../../components/Layout";
import { ICar } from "../../interfaces/Car";

const SearchPage = () => {
  const cars = useISelector((state) => state.search.cars);
  const garages = useISelector((state) => state.search.garages);
  const state = useISelector((state) => state);

  const showCars = cars.length > 0;
  const showGarages = garages.length > 0;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.q !== "string") return;

    dispatch(actions.search.set.input(router.query.q));
    dispatch(actions.search.search(router.query.q));
  }, [router.query.q]);

  const onCarClick = (car: ICar) => {
    dispatch(actions.check.car(car));
  };

  return <Layout>{showCars && <CarGrid cars={cars} onClick={(car) => onCarClick(car)} />}</Layout>;
};

export default SearchPage;
