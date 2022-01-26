import { useState } from "react";
import { IGarageDeep } from "../../../interfaces/Garage";
import { PageButton, PageButtonContainer, PageCard, InputContainer } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import { DescInput } from "./DescInput";
import { Label } from "../../Styles/Page-cards";
import { toast } from "react-toastify";
import { styled } from "../../../stitches.config";
import { DeleteButton } from "./DeleteButton";
import { request } from "../../../util/axios";

interface Props {
  garage: IGarageDeep;
}

const Div = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export const GaragePageCard = ({ garage }: Props) => {
  const [descVal, setDescVal] = useState(garage.desc);
  const [originalDesc, setOriginalDesc] = useState(garage.desc);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const descHasChanged = descVal !== originalDesc;

  const onChange = (value: string) => setDescVal(value);

  const onSaveClick = async () => {
    if (!descHasChanged) return toast.error("You haven't changed the description");

    setLoading(true);
    const res = await request(`/garages/${garage.id}/desc`, "PATCH", { newDesc: descVal });

    if (res) {
      setLoading(false);
      toast.success("Description updated successfully!");

      if (res?.data) setOriginalDesc(res.data.desc);
    } else {
      setLoading(false);
      setError(true);
      toast.error("Something went wrong, no changes were made.");
    }
  };

  return (
    <PageCard>
      <Div>
        <Title>{garage?.name}</Title>
        <Title>
          {garage.cars.length} / {garage.capacity}
        </Title>
      </Div>

      <Desc>Change garage's description below (optional)</Desc>

      <InputContainer>
        <Label htmlFor="desc-input">Description</Label>
        <DescInput onChange={(value) => onChange(value)} value={descVal} />
      </InputContainer>

      <PageButtonContainer>
        <DeleteButton garage={garage} />
        <PageButton green disabled={!descHasChanged} onClick={() => onSaveClick()}>
          Save
        </PageButton>
      </PageButtonContainer>
    </PageCard>
  );
};
