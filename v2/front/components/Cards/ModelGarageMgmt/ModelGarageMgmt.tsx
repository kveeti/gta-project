import { useRouter } from "next/router";
import { FullWidthButton } from "../../Styles/Buttons";
import { PageCard } from "../../Styles/Page-cards";
import { Title } from "../../Styles/Text";
import { ModelGarageMgmtSearch } from "./Search/Index";

export const ModelGarageMgmt = () => {
  const router = useRouter();

  const onNewClick = () => {
    router.push("/management/model-garages/new", "/management/model-garages/new", {
      shallow: true,
    });
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>Manage model garages</Title>

      <ModelGarageMgmtSearch />

      <FullWidthButton blue onClick={onNewClick}>
        New model garage
      </FullWidthButton>
    </PageCard>
  );
};
