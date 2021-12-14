import Cars from "../../components/Cars/Cars";
import { useISelector } from "../../state/hooks";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import AddMenu from "../../components/Defaults/AddMenu";
import { NewCarDialog } from "../../components/Defaults/Dialog";

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
      <Cars cars={cars} />
      <AddMenu />
      <NewCarDialog />
    </>
  );
};

export default SearchPage;
