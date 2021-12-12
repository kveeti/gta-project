import Cars from "../../components/Cars/Cars";
import { useISelector } from "../../state/hooks";
import { MenuBar } from "../../components/MenuBar/MenuBar";

const SearchPage = () => {
  const cars = useISelector((state) => state.search.cars);

  return (
    <>
      <MenuBar />
      <Cars cars={cars} />
    </>
  );
};

export default SearchPage;
