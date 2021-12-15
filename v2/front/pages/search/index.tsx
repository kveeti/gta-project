import { useISelector } from "../../state/hooks";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import AddMenu from "../../components/Defaults/AddMenu";
import { NewCarDialog } from "../../components/Defaults/Dialog";
import { CarGrid } from "../../components/Cars/Grid";
import { GridWrapper } from "../../components/Defaults/Grid";

const SearchPage = () => {
  const cars = useISelector((state) => state.search.cars);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.q !== "string") return;

    dispatch(actions.search.set.input(router.query.q));
    dispatch(actions.search.search(router.query.q));
  }, [router.query.q]);

  return (
    <>
      <MenuBar />
      <GridWrapper>
        <CarGrid cars={cars} />
      </GridWrapper>

      <AddMenu />
      <NewCarDialog />
    </>
  );
};

export default SearchPage;
