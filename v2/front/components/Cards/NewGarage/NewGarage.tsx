import { GarageInputSelect } from "../../Input/react-select/NewGarage/GarageInput";
import { PageCard } from "../../Styles/Cards";
import { InputContainer, PageButtonContainer } from "../../Styles/Containers";
import { Desc, Label, Title } from "../../Styles/Text";
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
