import { useState } from "react";
import { IGarageDeep } from "../../../interfaces/Garage";
import { Desc, Label, Title } from "../../Common/Text";
import { DescInput } from "./DescInput";
import { toast } from "react-toastify";
import { styled } from "../../../stitches.config";
import { DeleteButton } from "./DeleteButton";
import { request } from "../../../util/axios";
import { PageButton } from "../../Common/Buttons";
import { InputContainer, PageButtonContainer } from "../../Common/Containers";
import { PageCard } from "../../Common/Cards";
import { msgs } from "../../../util/constants";

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

  const descHasChanged = descVal !== originalDesc;

  const onChange = (value: string) => setDescVal(value);

  const onSaveClick = async () => {
    if (!descHasChanged) return toast.error(msgs.error.nothingChanged);

    const res = await request(`/garages/${garage.id}/desc`, "PATCH", { newDesc: descVal });

    if (res) {
      toast.success(msgs.success.garageUpdated);
      if (res?.data) setOriginalDesc(res.data.desc);
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
