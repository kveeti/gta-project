import { useISelector } from "../../state/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { Content, Main, Section } from "../../components/Containers/Containers";
import Sidebar from "../../components/Sidebar/Sidebar";
import { CarGrid } from "../../components/Cars/Grid";

const SearchPage = () => {
  const cars = useISelector((state) => state.search.cars);
  const garages = useISelector((state) => state.search.garages);

  const showCars = cars.length > 0;
  const showGarages = garages.length > 0;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.q !== "string") return;

    dispatch(actions.search.set.input(router.query.q));
    dispatch(actions.search.search(router.query.q));
  }, [router.query.q]);

  return (
    <Section>
      <MenuBar />
      <Content>
        <Main>{showCars && <CarGrid cars={cars} />}</Main>
        <Sidebar />
      </Content>
    </Section>
  );
};

export default SearchPage;
