import { ModelGarageMgmt } from "../../../components/Cards/ModelGarageMgmt/ModelGarageMgmt";
import Layout from "../../../components/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const ModelCarManagementPage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();

  if (layoutViewBlocked) return null;

  return <Layout title="Model garages">{!viewBlocked && <ModelGarageMgmt />}</Layout>;
};

export default ModelCarManagementPage;
