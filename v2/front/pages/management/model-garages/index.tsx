import { ModelGarageManagementIndex } from "../../../components/Cards/Management/ModelGarage/IndexCard";
import Layout from "../../../components/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const ModelGarageManagementPage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();

  if (layoutViewBlocked) return null;

  return <Layout title="Model garages">{!viewBlocked && <ModelGarageManagementIndex />}</Layout>;
};

export default ModelGarageManagementPage;
