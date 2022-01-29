import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { Input } from "../../Input/Input";
import {
  Label,
  PageButton,
  PageButtonContainer,
  PageCard,
  InputContainer,
} from "../../Styles/Page-cards";
import { Title } from "../../Styles/Text";

export const NewModelGarageCard = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const reset = () => {
    setName("");
    setCapacity("");
  };

  const saveButtonDisabled = !name || !capacity;

  const onSave = async () => {
    const res = await request("/modelgarages", "POST", { name, capacity });

    if (res) {
      toast.success("New model garage saved successfully!");
      reset();
    }
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>New model garage</Title>

      <InputContainer>
        <NameInput value={name} setValue={setName} />
        <CapacityInput value={capacity} setValue={setCapacity} />
      </InputContainer>

      <PageButtonContainer>
        <PageButton green onClick={onSave} disabled={saveButtonDisabled}>
          Save
        </PageButton>
      </PageButtonContainer>
    </PageCard>
  );
};

const NameInput = ({ value, setValue }) => {
  return (
    <>
      <Label htmlFor="name">Name</Label>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="name"
        placeholder="E.g. Popular street, unit 2"
        transparent
      />
    </>
  );
};

const CapacityInput = ({ value, setValue }) => {
  return (
    <>
      <Label htmlFor="capacity">Capacity</Label>
      <Input
        onChange={(value) => setValue(value)}
        type="number"
        value={value}
        id="capacity"
        placeholder="E.g. 10"
        transparent
      />
    </>
  );
};
