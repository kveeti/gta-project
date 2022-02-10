import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../../state/actions";
import { useISelector } from "../../../../state/hooks";
import { request } from "../../../../util/axios";
import { PageButton } from "../../../Styles/Page-cards";

export const AddButton = () => {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  const newCarState = useISelector((state) => state.newCar);
  const chosenCars = newCarState.inputs.cars;
  const chosenGarage = newCarState.inputs.garage;

  const reset = () => {
    dispatch(actions.newCar.setInput.garage(null));
    dispatch(actions.newCar.setInput.car(null));
  };

  const onClick = async () => {
    console.log("chosenCars", chosenCars);
    console.log("chosenGarage", chosenGarage);

    if (!chosenCars.length || !chosenGarage) return;

    setSaving(true);

    const res = await request("/cars", "POST", {
      modelCarIds: chosenCars.map((car) => car.id),
      garageId: chosenGarage.id,
    });
    setSaving(false);

    if (res) {
      toast.success(`Car added!`);
      reset();
    }
  };

  const bothChosen = chosenCars?.length && chosenGarage;

  return (
    <PageButton disabled={!bothChosen || saving} green onClick={() => onClick()}>
      Add
    </PageButton>
  );
};
