import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { request } from "../../../../util/axios";
import { msgs } from "../../../../util/constants";
import { PageButton } from "../../../Common/Buttons";

export const AddButton = () => {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  const newCarState = useISelector((state) => state.newCar);
  const chosenCars = newCarState.inputs.cars;
  const chosenGarage = newCarState.inputs.garage;

  const onClick = async () => {
    if (!chosenCars.length || !chosenGarage) return;

    const plural = chosenCars.length > 1;

    setSaving(true);

    const res = await request("/cars", "POST", {
      modelCarIds: chosenCars.map((car) => car.id),
      garageId: chosenGarage.id,
    });

    setSaving(false);

    if (res) {
      toast.success(plural ? msgs.success.carAdded.plural : msgs.success.carAdded.singular);
      dispatch(actions.newCar.reset());
    }
  };

  const bothChosen = chosenCars?.length && chosenGarage;

  return (
    <PageButton disabled={!bothChosen || saving} green onClick={onClick}>
      Add
    </PageButton>
  );
};
