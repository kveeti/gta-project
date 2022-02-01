import { NewModelCarCard } from "../../../components/Cards/Management/ModelCar/NewModelCar";
import Layout from "../../../components/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const NewModelCarPage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();

  if (layoutViewBlocked) return null;

  return <Layout title="New model car">{!viewBlocked && <NewModelCarCard />}</Layout>;
};

export default NewModelCarPage;
