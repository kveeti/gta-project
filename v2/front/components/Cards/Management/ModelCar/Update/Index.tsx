import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { gtabaseLinkPrefix } from "../../../../../envs";
import { useAdminCheck } from "../../../../../hooks/useAdminCheck";
import { request } from "../../../../../util/axios";
import { paths, msgs } from "../../../../../util/constants";
import { PageButton } from "../../../../Styles/Buttons";
import { PageCard } from "../../../../Styles/Cards";
import { InputContainer, PageButtonContainer } from "../../../../Styles/Containers";
import { Title } from "../../../../Styles/Text";
import { ClassInput, LinkInput, ManufacturerInput, NameInput } from "./Inputs";

export const ModelCarUpdateCard = () => {
  const router = useRouter();

  const { carId } = router.query;

  const [ogName, setOgName] = useState("");
  const [ogManufacturer, setOfManufacturer] = useState("");
  const [ogClass, setOgClass] = useState("");
  const [ogLink, setOgLink] = useState("");

  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [_class, setClass] = useState("");
  const [link, setLink] = useState("");

  const getCar = async () => {
    const res = await request(`/modelcars/${carId}`, "GET");

    if (res) {
      setName(res.data.name);
      setOgName(res.data.name);

      setManufacturer(res.data.manufacturer);
      setOfManufacturer(res.data.manufacturer);

      setClass(res.data.class);
      setOgClass(res.data.class);

      setLink(res.data.link.split("vehicles/")[1]);
      setOgLink(res.data.link.split("vehicles/")[1]);
    } else {
      toast.error(msgs.error.somethingWentWrong);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  const onSave = async () => {
    const res = await request(`/modelcars/${carId}`, "PATCH", {
      name,
      manufacturer,
      class: _class,
      link: `${gtabaseLinkPrefix}${link}`,
    });

    if (res) {
      getCar();
      toast.success(msgs.success.modelCarUpdated);
    }
  };

  const onBackClick = () => {
    router.push(paths.mgmtModelCarIndex());
  };

  const updateButtonDisabled =
    !name ||
    !manufacturer ||
    !_class ||
    !link ||
    (name === ogName && manufacturer === ogManufacturer && _class === ogClass && link === ogLink);

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>Update model car</Title>

      <InputContainer>
        <NameInput value={name} setValue={setName} />
        <ManufacturerInput value={manufacturer} setValue={setManufacturer} />
        <ClassInput value={_class} setValue={setClass} />
        <LinkInput value={link} setValue={setLink} />
      </InputContainer>

      <PageButtonContainer>
        <PageButton gray onClick={onBackClick}>
          Back
        </PageButton>
        <PageButton green onClick={onSave} disabled={updateButtonDisabled}>
          Update
        </PageButton>
      </PageButtonContainer>
    </PageCard>
  );
};
