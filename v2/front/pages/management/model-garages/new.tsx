import { NewModelGarageCard } from "../../../components/Cards/Management/ModelGarage/NewModelGarage";
import Layout from "../../../components/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const NewModelGaragePage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();

  if (layoutViewBlocked) return null;

  return <Layout>{!viewBlocked && <NewModelGarageCard />}</Layout>;
};

export default NewModelGaragePage;
