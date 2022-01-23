import { useISelector } from "../../../state/hooks";
import { PageButtonContainer, PageCard, InputContainer } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import { GarageInput } from "./GarageInput";
import MatchingGarages from "./MatchingGarages";
import { MoveButton } from "./MoveButton";

export const MoveCard = () => {
  const checkedCars = useISelector((state) => state.checked.cars);

  const plural = checkedCars.length === 1 ? "" : "s";

  return (
    <PageCard centered>
      <Title>Move</Title>
      <Desc>
        Select a garage below to move the selected car{plural} there.
        <br />
        <br />
        {checkedCars.length} car{plural} selected.
      </Desc>

      <InputContainer>
        <GarageInput />
        <MatchingGarages />
      </InputContainer>

      <PageButtonContainer>
        <MoveButton />
      </PageButtonContainer>
    </PageCard>
  );
};
