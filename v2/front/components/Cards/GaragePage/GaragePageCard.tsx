import { useState } from "react";
import { IGarageDeep } from "../../../interfaces/Garage";
import { InputContainer, PageButton, PageButtonContainer, PageCard } from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";
import { DescInput } from "./DescInput";
import { Label } from "../../Styles/Page-cards";
import { toast } from "react-toastify";
import { styled } from "../../../stitches.config";
import { apiBaseUrl } from "../../../envs";
import axios from "axios";
import { getNextAxiosConfig } from "../../../state/actions/axiosConfig";

interface Props {
  garage: IGarageDeep;
}

const Div = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export const GaragePageCard = ({ garage }: Props) => {
  const [descVal, setDescVal] = useState(garage.desc);

  const descHasChanged = descVal !== garage.desc;

  const onChange = (value: string) => setDescVal(value);

  const onSaveClick = async () => {
    if (!descHasChanged) return toast.error("You haven't changed the description");

    const res = await axios(
      getNextAxiosConfig(`/garages/${garage.id}/desc`, "PATCH", { desc: descVal })
    );
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
        <PageButton green disabled={!descHasChanged} onClick={() => onSaveClick()}>
          Save
        </PageButton>
      </PageButtonContainer>
    </PageCard>
  );
};
