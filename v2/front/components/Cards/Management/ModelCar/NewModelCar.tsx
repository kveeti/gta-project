import { useState } from "react";
import { toast } from "react-toastify";
import { gtabaseLinkPrefix } from "../../../../envs";
import { request } from "../../../../util/axios";
import { Input } from "../../../Input/Input";
import { PageButton } from "../../../Styles/Buttons";
import { PageCard } from "../../../Styles/Cards";
import { InputContainer, PageButtonContainer } from "../../../Styles/Containers";
import { Label, Title } from "../../../Styles/Text";

export const NewModelCarCard = () => {
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

  const saveButtonDisabled = !name || !manufacturer || !_class || !link;

  const onSave = async () => {
    const res = await request("/modelcars", "POST", {
      name,
      manufacturer,
      class: _class,
      link: `${gtabaseLinkPrefix}${link}`,
    });

    if (res) {
      toast.success("New model car saved successfully!");
      reset();
    }
  };

  const onManufacturerBlur = () => {
    setLink(`${manufacturer.toLowerCase()}-${name.toLowerCase()}`);
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>New model car</Title>

      <InputContainer>
        <NameInput value={name} setValue={setName} />
        <ManufacturerInput
          value={manufacturer}
          setValue={setManufacturer}
          onBlur={onManufacturerBlur}
        />
        <ClassInput value={_class} setValue={setClass} />
        <LinkInput value={link} setValue={setLink} />
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
        placeholder="E.g. 8f Drafter"
      />
    </>
  );
};

const ManufacturerInput = ({ value, setValue, onBlur }) => {
  return (
    <>
      <Label htmlFor="manufacturer">Manufacturer</Label>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="manufacturer"
        placeholder="E.g. Obey"
        onBlur={onBlur}
      />
    </>
  );
};

const ClassInput = ({ value, setValue }) => {
  return (
    <>
      <Label htmlFor="class">Class</Label>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="class"
        placeholder="E.g. Sports"
      />
    </>
  );
};

const LinkInput = ({ value, setValue }) => {
  return (
    <>
      <Label htmlFor="link">Link</Label>
      <Input
        onChange={(value) => setValue(value)}
        type="text"
        value={value}
        id="link"
        placeholder="Link to gtabase.com"
      />
    </>
  );
};
