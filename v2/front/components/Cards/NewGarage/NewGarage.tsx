import { styled } from "../../../stitches.config";
import { Desc } from "../../Styles/Text";
import SaveButton from "./Buttons/Save";
import { DescInput } from "./Inputs/Desc";
import { GarageInput } from "./Inputs/Garage";
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

export const NewGarageCard = () => {
  return (
    <StyledCard>
      <Title>New Garage</Title>
      <Desc>Save a new garage here. The description is optional.</Desc>

      <GarageInput />
      <MatchingGarages />
      <DescInput />

      <Buttons>
        <SaveButton />
      </Buttons>
    </StyledCard>
  );
};
