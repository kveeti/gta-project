import { CarInputSelect } from "../../Input/react-select/NewCar/CarInput";
import { GarageInputSelect } from "../../Input/react-select/NewCar/GarageInput";
import { PageCard } from "../../Styles/Cards";
import { InputContainer, PageButtonContainer } from "../../Styles/Containers";
import { Desc, Label, Title } from "../../Styles/Text";
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
