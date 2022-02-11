import { useRouter } from "next/router";
import { useState } from "react";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Styles/Buttons";
import { PageCard } from "../../../Styles/Cards";
import { InputContainer } from "../../../Styles/Containers";
import { Title } from "../../../Styles/Text";
import { MatchingGarages } from "./Search/Matching";
import { SearchInput } from "./Search/SearchInput";

export const ModelGarageManagementIndex = () => {
  const router = useRouter();
  const [matching, setMatching] = useState([]);

  const onNewClick = () => {
    router.push(paths.mgmtModelGarageNew());
  };

  return (
    <PageCard centered>
      <Title padding>Manage model garages</Title>

      <InputContainer>
        <SearchInput setMatching={setMatching} />
        <MatchingGarages garages={matching} />
      </InputContainer>

      <FullWidthButton blue onClick={onNewClick}>
        New model garage
      </FullWidthButton>
    </PageCard>
  );
};
