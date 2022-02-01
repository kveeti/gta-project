import { useRouter } from "next/router";
import { useState } from "react";
import { FullWidthButton } from "../../../Styles/Buttons";
import { InputContainer, PageCard } from "../../../Styles/Page-cards";
import { Title } from "../../../Styles/Text";
import { MatchingCars } from "./Search/Matching";
import { SearchInput } from "./Search/SearchInput";

export const ModelCarManagementIndex = () => {
  const router = useRouter();
  const [matching, setMatching] = useState([]);

  const onNewClick = () => {
    router.push("/management/model-cars/new", "/management/model-cars/new", { shallow: true });
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>Manage model cars</Title>

      <InputContainer>
        <SearchInput setMatching={setMatching} />
        <MatchingCars cars={matching} />
      </InputContainer>

      <FullWidthButton blue onClick={onNewClick}>
        New model car
      </FullWidthButton>
    </PageCard>
  );
};
