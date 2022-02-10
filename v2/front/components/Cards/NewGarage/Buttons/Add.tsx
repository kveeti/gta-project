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

  const state = useISelector((state) => state.newGarage);

  const chosenGarage = state.inputs.garage;
  const desc = state.inputs.desc;

  const onClick = async () => {
    if (!chosenGarage) return toast.error("No garage chosen");

    setSaving(true);
    const res = await request(`/garages`, "POST", {
      modelGarageId: chosenGarage.id,
      desc,
    });

    setSaving(false);

    if (res) {
      dispatch(actions.users.get.me());

      toast.success("Garage added!");
      dispatch(actions.newGarage.reset());
    }
  };

  return (
    <PageButton green onClick={onClick} disabled={!chosenGarage || saving}>
      Save
    </PageButton>
  );
};
