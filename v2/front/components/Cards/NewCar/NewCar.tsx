import { CarInputSelect } from "../../Input/react-select/NewCar/CarInput";
import { GarageInputSelect } from "../../Input/react-select/NewCar/GarageInput";
import { PageButtonContainer, PageCard, InputContainer, Label } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import { AddButton } from "./Buttons/Add";

const NewCarCard = () => {
  return (
    <PageCard centered>
      <Title>New Cars</Title>
      <Desc>Add new cars here.</Desc>

      <InputContainer>
        <Label htmlFor="car-input">Cars</Label>
        <CarInputSelect />

        <Label htmlFor="garage-input">Garage</Label>
        <GarageInputSelect />
      </InputContainer>

      <PageButtonContainer>
        <AddButton />
      </PageButtonContainer>
    </PageCard>
  );
};

export default NewCarCard;
