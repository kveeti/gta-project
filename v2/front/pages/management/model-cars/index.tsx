import { ModelCarMgmt } from "../../../components/Cards/ModelCarMgmt/ModelCarMgmt";
import Layout from "../../../components/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const ModelCarManagementPage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();

  if (layoutViewBlocked) return null;

  return <Layout title="Model cars">{!viewBlocked && <ModelCarMgmt />}</Layout>;
};

export default ModelCarManagementPage;
