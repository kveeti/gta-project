import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAdminCheck } from "../../../../hooks/useAdminCheck";
import { config } from "../../../../util/axios";
import {
  InputContainer,
  PageButton,
  PageButtonContainer,
  PageCard,
} from "../../../Styles/Page-cards";
import { Title } from "../../../Styles/Text";
import { getGarage } from "./getGarage";
import { CapacityInput, NameInput } from "./Inputs";

export const ModelGarageUpdateCard = () => {
  const loading = useAdminCheck();
  const router = useRouter();

  const { garageId } = router.query;

  const [originalName, setOriginalName] = useState("");
  const [originalCapacity, setOriginalCapacity] = useState("");

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    getGarage({ setName, setOriginalName, setCapacity, setOriginalCapacity, garageId });
  }, []);

  if (loading) return null;

  const onSave = async () => {
    try {
      await axios(config(`/modelgarages/${garageId}`, "PATCH", { name, capacity }));

      toast.success("Model garage updated successfully!");
      getGarage({ setName, setOriginalName, setCapacity, setOriginalCapacity, garageId });
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onBackClick = () => {
    router.push("/management/model-garages", "/management/model-garages", { shallow: true });
  };

  const updateButtonDisabled =
    !name || !capacity || (name === originalName && capacity === originalCapacity);

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>Update model garage</Title>

      <InputContainer>
        <NameInput value={name} setValue={setName} />
        <CapacityInput value={capacity} setValue={setCapacity} />
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
