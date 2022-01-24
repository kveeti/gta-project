import { useState } from "react";
import { InputContainer } from "../../../Styles/Page-cards";
import { MatchingCars } from "./Matching";
import { SearchInput } from "./SearchInput";

export const ModelCarMgmtSearch = () => {
  const [matching, setMatching] = useState([]);

  return (
    <>
      <InputContainer>
        <SearchInput setMatching={setMatching} />
        <MatchingCars cars={matching} />
      </InputContainer>
    </>
  );
};
