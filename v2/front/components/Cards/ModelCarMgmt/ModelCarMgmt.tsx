import { useRouter } from "next/router";
import { FullWidthButton } from "../../Styles/Buttons";
import { PageCard } from "../../Styles/Page-cards";
import { Title } from "../../Styles/Text";
import { ModelCarMgmtSearch } from "./Search/Index";

export const ModelCarMgmt = () => {
  const router = useRouter();

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
