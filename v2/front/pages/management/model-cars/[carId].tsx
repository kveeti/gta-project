import { useRouter } from "next/router";
import { ModelCarUpdateCard } from "../../../components/Cards/Management/ModelCar/Update/Index";
import Layout from "../../../components/Layout";
import { useAdminCheck } from "../../../hooks/useAdminCheck";

const ModelCarPage = () => {
  const { layoutViewBlocked, viewBlocked } = useAdminCheck();
  const router = useRouter();

  if (layoutViewBlocked) return null;

  console.log(router.query);

  return <Layout title={"Update model car"}>{!viewBlocked && <ModelCarUpdateCard />}</Layout>;
};

export default ModelCarPage;
