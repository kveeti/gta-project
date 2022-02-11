import { useRouter } from "next/router";
import { useState } from "react";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Styles/Buttons";
import { PageCard } from "../../../Styles/Cards";
import { InputContainer } from "../../../Styles/Containers";
import { Title } from "../../../Styles/Text";
import { MatchingCars } from "./Search/Matching";
import { SearchInput } from "./Search/SearchInput";

export const ModelCarManagementIndex = () => {
  const router = useRouter();
  const [matching, setMatching] = useState([]);

  const onNewClick = () => {
    router.push(paths.mgmtModelCarNew());
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
