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

  const state = useISelector((state) => state.newGarage);

  const chosenGarage = state.inputs.garage;
  const desc = state.inputs.desc;

  const onClick = async () => {
    if (!chosenGarage) return toast.error(msgs.error.noGarageSelected);

    setSaving(true);
    const res = await request(`/garages`, "POST", {
      modelGarageId: chosenGarage.id,
      desc,
    });

    setSaving(false);

    if (res) {
      dispatch(actions.users.get.me());

      toast.success(msgs.success.garageAdded);
      dispatch(actions.newGarage.reset());
    }
  };

  return (
    <PageButton green onClick={onClick} disabled={!chosenGarage || saving}>
      Save
    </PageButton>
  );
};
