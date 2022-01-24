import { useRouter } from "next/router";
import { useAdminCheck } from "../../../hooks/useAdminCheck";
import { FullWidthButton } from "../../Styles/Buttons";
import { PageCard } from "../../Styles/Page-cards";
import { Title } from "../../Styles/Text";
import { ModelCarMgmtSearch } from "./Search/Index";

export const ModelCarMgmt = () => {
  const loading = useAdminCheck();
  const router = useRouter();

  if (loading) return null;

  const onNewClick = () => {
    router.push("/management/model-cars/new", "/management/model-cars/new", { shallow: true });
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>Manage model cars</Title>

      <ModelCarMgmtSearch />

      <FullWidthButton blue onClick={onNewClick}>
        New model car
      </FullWidthButton>
    </PageCard>
  );
};
