import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import {
  garageRename_setNewDesc,
  garageRename_setRenameBtnDisabled,
} from "../../../actions/garageRename.js";

const Rename = ({ garage }) => {
  const dispatch = useDispatch();

  const { newDesc } = useSelector((state) => state.garageRename);

  useEffect(() => {
    return () => {
      dispatch(garageRename_setNewDesc(""));
    };
  }, [dispatch, garage.name]);

  const handleDescChange = (e) => {
    const input = e.target.value.trim();

    if (!input) {
      dispatch(garageRename_setNewDesc(""));
      dispatch(garageRename_setRenameBtnDisabled(true));
      return;
    }

    dispatch(garageRename_setNewDesc(e.target.value));

    if (input !== garage.desc) {
      dispatch(garageRename_setRenameBtnDisabled(false));
      return;
    }

    dispatch(garageRename_setRenameBtnDisabled(true));
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
