import { PageButtonContainer, PageCard } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import SaveButton from "./Buttons/Save";
import { DescInput } from "./Inputs/Desc";
import { GarageInput } from "./Inputs/Garage";
import MatchingGarages from "./Matching/MatchingGarages";

export const NewGarageCard = () => {
  return (
    <PageCard centered>
      <Title>New Garage</Title>
      <Desc>Save a new garage here. The description is optional.</Desc>

      <GarageInput />
      <MatchingGarages />
      <DescInput />

      <PageButtonContainer>
        <SaveButton />
      </PageButtonContainer>
    </PageCard>
  );
};
