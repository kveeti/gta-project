import { styled } from "../../../stitches.config";
import { Desc } from "../../Styles/Text";
import SaveButton from "./Buttons/Save";
import CarInput from "./Inputs/Car";
import GarageInput from "./Inputs/Garage";
import MatchingCars from "./Matching/MatchingCars";
import MatchingGarages from "./Matching/MatchingGarages";

const StyledCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "1rem",
  borderRadius: 4,
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
  gap: "1rem",
});

const Buttons = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "2rem",
});

const Title = styled("p", {
  all: "unset",
  fontSize: "1.5rem",
  fontWeight: 500,
});

const NewCarCard = () => {
  return (
    <StyledCard>
      <Title>New Car</Title>
      <Desc>Save a new car here.</Desc>

      <CarInput />
      <MatchingCars />

      <GarageInput />
      <MatchingGarages />

      <Buttons>
        <SaveButton />
      </Buttons>
    </StyledCard>
  );
};

export default NewCarCard;
