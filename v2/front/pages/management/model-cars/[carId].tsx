import { ModelCarUpdateCard } from "../../../components/Cards/Management/ModelCar/Update/Index";
import Layout from "../../../components/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const ModelCarPage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();

  if (layoutViewBlocked) return null;

  return <Layout title={"Update model car"}>{!viewBlocked && <ModelCarUpdateCard />}</Layout>;
};

export default ModelCarPage;
