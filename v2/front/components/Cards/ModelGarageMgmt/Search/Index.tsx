import { useState } from "react";
import { InputContainer } from "../../../Styles/Page-cards";
import { MatchingGarages } from "./Matching";
import { SearchInput } from "./SearchInput";

export const ModelGarageMgmtSearch = () => {
  const [matching, setMatching] = useState([]);

  return (
    <>
      <InputContainer>
        <SearchInput setMatching={setMatching} />
        <MatchingGarages garages={matching} />
      </InputContainer>
    </>
  );
};
