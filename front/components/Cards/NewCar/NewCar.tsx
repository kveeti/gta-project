import { CarInputSelect } from "../../Common/Input/react-select/NewCar/CarInput";
import { GarageInputSelect } from "../../Common/Input/react-select/NewCar/GarageInput";
import { PageCard } from "../../Common/Cards";
import { InputContainer, PageButtonContainer } from "../../Common/Containers";
import { Desc, Label, Title } from "../../Common/Text";
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
