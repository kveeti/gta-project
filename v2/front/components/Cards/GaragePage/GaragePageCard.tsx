import { useState } from "react";
import { IGarageDeep } from "../../../interfaces/Garage";
import { InputContainer, PageButton, PageButtonContainer, PageCard } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import { DescInput } from "./DescInput";
import { Label } from "../../Styles/Page-cards";
import { toast } from "react-toastify";
import { styled } from "../../../stitches.config";
import axios from "axios";
import { config } from "../../../util/axios";
import { DeleteButton } from "./DeleteButton";

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

    try {
      setLoading(true);
      const res = await axios(config(`/garages/${garage.id}/desc`, "PATCH", { desc: descVal }));
      setLoading(false);
      toast.success("Description updated successfully!");

      if (res?.data) setOriginalDesc(res.data.desc);
    } catch (err) {
      setLoading(false);
      setError(true);
      toast.error("Error updating description");
    }
  };

  return (
    <PageCard>
      <Div>
        <Title>{garage?.name}</Title>
        <Title>
          {garage.amountOfCars} / {garage.capacity}
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
