import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import {
  garageRename_setNewDesc,
  garageRename_setNewName,
  garageRename_setRenameBtnDisabled,
} from "../../../actions/garageRename.js";
import { colors } from "../../../styles/colors.js";

const Rename = ({ garage }) => {
  const dispatch = useDispatch();

  const { newName, newDesc } = useSelector((state) => state.garageRename);

  useEffect(() => {
    dispatch(garageRename_setNewDesc(garage.desc));
    dispatch(garageRename_setNewName(garage.name));
  }, [dispatch, garage.desc, garage.name]);

  const handleNameChange = (e) => {
    const input = e.target.value.trim();

    if (!input) {
      dispatch(garageRename_setNewName(""));
      dispatch(garageRename_setRenameBtnDisabled(true));
      return;
    }

    dispatch(garageRename_setNewName(e.target.value));

    if (input !== garage.name) {
      dispatch(garageRename_setRenameBtnDisabled(false));
      return;
    }

    dispatch(garageRename_setRenameBtnDisabled(true));
  };

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
        className="garage-card__input"
        onChange={handleNameChange}
        value={newName}
      />
      <input
        className="garage-card__input"
        onChange={handleDescChange}
        value={newDesc}
      />
    </Fade>
  );
};

export default Rename;
