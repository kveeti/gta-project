import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import {
  garageModify_setNewDesc,
  garageModify_setRenameBtnDisabled,
} from "../../../actions/garageModify.js";

const Rename = ({ garage }) => {
  const dispatch = useDispatch();

  const { newDesc } = useSelector((state) => state.garageModify);

  useEffect(() => {
    return () => {
      dispatch(garageModify_setNewDesc(""));
    };
  }, [dispatch, garage.name]);

  const handleDescChange = (e) => {
    const input = e.target.value.trim();

    if (!input) {
      dispatch(garageModify_setNewDesc(""));
      dispatch(garageModify_setRenameBtnDisabled(true));
      return;
    }

    dispatch(garageModify_setNewDesc(e.target.value));

    if (input !== garage.desc) {
      dispatch(garageModify_setRenameBtnDisabled(false));
      return;
    }

    dispatch(garageModify_setRenameBtnDisabled(true));
  };

  return (
    <Fade duration={500}>
      <input
        type="text"
        className="garage-card__input"
        onChange={handleDescChange}
        value={newDesc}
        placeholder={garage.desc ? garage.desc : "description (optional)"}
      />
    </Fade>
  );
};

export default Rename;
