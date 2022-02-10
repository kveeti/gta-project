import { GarageInputSelect } from "../../Input/react-select/NewGarage/GarageInput";
import { PageButtonContainer, PageCard, InputContainer, Label } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import { AddButton } from "./Buttons/Add";
import { DescInput } from "./Inputs/Desc";

export const NewGarageCard = () => {
  return (
    <PageCard centered>
      <Title>New Garage</Title>
      <Desc>Save a new garage here. The description is optional.</Desc>

      <InputContainer>
        <Label htmlFor="garage-input">Garage</Label>
        <GarageInputSelect />
        <DescInput />
      </InputContainer>

      <PageButtonContainer>
        <AddButton />
      </PageButtonContainer>
    </PageCard>
  );
};
