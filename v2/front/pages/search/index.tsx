import Cars from "../../components/Cars/Cars";
import { useISelector } from "../../state/hooks";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { search } from "../../state/actions/search";

const SearchPage = () => {
  const cars = useISelector((state) => state.search.cars);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.q !== "string") return;

    dispatch(search.set.input(router.query.q));
    dispatch(search.search(router.query.q));
  }, [router.query.q]);

  return (
    <>
      <MenuBar />
      <Cars cars={cars} />
    </>
  );
};

export default SearchPage;
