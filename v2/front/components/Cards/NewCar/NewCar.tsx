import { PageButtonContainer, PageCard } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import SaveButton from "./Buttons/Save";
import CarInput from "./Inputs/Car";
import GarageInput from "./Inputs/Garage";
import MatchingCars from "./Matching/MatchingCars";
import MatchingGarages from "./Matching/MatchingGarages";

const NewCarCard = () => {
  return (
    <PageCard>
      <Title>New Car</Title>
      <Desc>Save a new car here.</Desc>

      <CarInput />
      <MatchingCars />

      <GarageInput />
      <MatchingGarages />

      <PageButtonContainer>
        <SaveButton />
      </PageButtonContainer>
    </PageCard>
  );
};

export default NewCarCard;
