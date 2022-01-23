import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAdminCheck } from "../../../hooks/useAdminCheck";
import { styled } from "../../../stitches.config";
import { config } from "../../../util/axios";
import { Input } from "../../Input/Input";
import {
  InputContainer,
  Label,
  PageButton,
  PageButtonContainer,
  PageCard,
} from "../../Styles/Page-cards";
import { Title } from "../../Styles/Text";

const StyledLabel = styled(Label, {
  width: 50,
});

export const NewModelGarageCard = () => {
  const loading = useAdminCheck();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  if (loading) return null;

  const reset = () => {
    setName("");
    setCapacity("");
  };

  const saveButtonDisabled = !name || !capacity;

  const onSave = async () => {
    try {
      await axios(config("/modelgarages", "POST", { name, capacity }));

      toast.success("New model garage saved successfully!");
      reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>New model garage</Title>

      <NameInput value={name} setValue={setName} />
      <CapacityInput value={capacity} setValue={setCapacity} />

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
    <InputContainer>
      <StyledLabel htmlFor="name">Name</StyledLabel>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="name"
        placeholder="E.g. Popular street, unit 2"
        autoFocus
        transparent
      />
    </InputContainer>
  );
};

const CapacityInput = ({ value, setValue }) => {
  return (
    <InputContainer>
      <StyledLabel htmlFor="class">Class</StyledLabel>
      <Input
        onChange={(value) => setValue(value)}
        type="number"
        value={value}
        id="class"
        placeholder="E.g. 10"
        transparent
      />
    </InputContainer>
  );
};
