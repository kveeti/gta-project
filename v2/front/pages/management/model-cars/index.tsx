import { ModelCarManagementIndex } from "../../../components/Cards/Management/ModelCar/IndexCard";
import Layout from "../../../components/Layouts/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const ModelCarManagementPage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();

  if (layoutViewBlocked) return null;

  return <Layout title="Model cars">{!viewBlocked && <ModelCarManagementIndex />}</Layout>;
};

export default ModelCarManagementPage;
