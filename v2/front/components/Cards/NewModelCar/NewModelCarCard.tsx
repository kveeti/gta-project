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
  width: 93,
});

export const NewModelCarCard = () => {
  const loading = useAdminCheck();

  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [_class, setClass] = useState("");
  const [link, setLink] = useState("");

  const reset = () => {
    setName("");
    setManufacturer("");
    setClass("");
    setLink("");
  };

  if (loading) return null;

  const saveButtonDisabled = !name || !manufacturer || !_class || !link;

  const onSave = async () => {
    try {
      await axios(config("/modelcars", "POST", { name, manufacturer, class: _class, link }));

      toast.success("Model car saved successfully!");
      reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onManufacturerBlur = () => {
    const prefix = "https://www.gtabase.com/grand-theft-auto-v/vehicles/";
    setLink(`${prefix}${manufacturer.toLowerCase()}-${name.toLowerCase()}`);
  };

  return (
    <PageCard centered>
      <Title>New model car</Title>

      <NameInput value={name} setValue={setName} />
      <ManufacturerInput
        value={manufacturer}
        setValue={setManufacturer}
        onBlur={onManufacturerBlur}
      />
      <ClassInput value={_class} setValue={setClass} />
      <LinkInput value={link} setValue={setLink} />

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
        placeholder="E.g. 8f Drafter"
        autoFocus
        transparent
      />
    </InputContainer>
  );
};

const ManufacturerInput = ({ value, setValue, onBlur }) => {
  return (
    <InputContainer>
      <StyledLabel htmlFor="manufacturer">Manufacturer</StyledLabel>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="manufacturer"
        placeholder="E.g. Obey"
        onBlur={onBlur}
        transparent
      />
    </InputContainer>
  );
};

const ClassInput = ({ value, setValue }) => {
  return (
    <InputContainer>
      <StyledLabel htmlFor="class">Class</StyledLabel>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="class"
        placeholder="E.g. Sports"
        transparent
      />
    </InputContainer>
  );
};

const LinkInput = ({ value, setValue }) => {
  return (
    <InputContainer>
      <StyledLabel htmlFor="link">Link</StyledLabel>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="link"
        placeholder="Link to gtabase.com"
        transparent
      />
    </InputContainer>
  );
};
