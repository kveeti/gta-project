import { useDispatch, useSelector } from "react-redux";

import Rename from "./rename.js";
import { Button } from "@material-ui/core";

import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

import {
  garageModify_deleteGarage,
  garageModify_rename,
  garageModify_setOpenGarage,
  garageModify_setRenameBtnDisabled,
  garageModify_set_garage_being_deleted,
} from "../../../actions/garageModify.js";

import { useBtnStyles } from "../../../styles/buttonStyles.js";
import garageIcon from "../../../images/garage-icon.png";
import carIcon from "../../../images/car-icon.png";

const animation = {
  variants: {
    expanded: {
      height: "7em",
    },
    collapsed: {
      height: "4.5em",
    },
  },
  transition: {
    type: "spring",
    damping: 100,
    stiffness: 800,
  },
};

const Garage = ({ garage }) => {
  const dispatch = useDispatch();
  const btnClasses = useBtnStyles();

  const { openGarage, isRenameBtnDisabled, newDesc } = useSelector(
    (state) => state.garageModify
  );
  const searchInput = useSelector((state) => state.search.input);
  const garageBeingDeleted = useSelector(
    (state) => state.garageModify.garageBeingDeleted
  );

  let open = false;
  let isThisBeingDeleted = false;

  if (openGarage === garage._id) {
    open = true;
  }

  if (garageBeingDeleted === garage._id) {
    isThisBeingDeleted = true;
  }

  const handleModify = (e) => {
    dispatch(garageModify_setRenameBtnDisabled(true));
    if (open) {
      dispatch(garageModify_setOpenGarage(null));
      return;
    }

    dispatch(garageModify_setOpenGarage(garage._id));
  };

  const handleRename = (e) => {
    dispatch(garageModify_rename(newDesc, garage._id, searchInput));
  };

  const handleDelete = (e) => {
    dispatch(garageModify_deleteGarage(garage._id, searchInput));
  };

  const handleDeleteState = () => {
    if (isThisBeingDeleted) {
      dispatch(garageModify_set_garage_being_deleted(null));
      return;
    }

    dispatch(garageModify_set_garage_being_deleted(garage._id));
  };

  return (
    <Fade duration={500}>
      <motion.div
        animate={open ? "expanded" : "collapsed"}
        variants={animation.variants}
        transition={animation.transition}
        className={`card garage-card elevation1 uppercase ${
          isThisBeingDeleted ? "card-error garage-delete-card" : ""
        }`}
      >
        {isThisBeingDeleted ? (
          <>
            <p>
              delete garage: <strong>{garage.name}</strong>?
            </p>
            <div className="garage-delete-card-actions">
              <Button onClick={handleDelete}>delete</Button>
              <Button onClick={handleDeleteState}>cancel</Button>
            </div>
          </>
        ) : (
          <>
            <motion.div className="garage-card-left ">
              <motion.div className="garage-card__info">
                <p className="text-primary">{garage.name}</p>
                {open ? (
                  <Rename garage={garage} />
                ) : (
                  <Fade duration={500}>
                    <p className="text-secondary">
                      {garage.desc.length ? `${garage.desc}` : ""}
                    </p>
                  </Fade>
                )}
              </motion.div>
              {open ? (
                <div className="garage-card__actions">
                  <Fade duration={500}>
                    <Button
                      className={btnClasses.renameBtn}
                      onClick={handleRename}
                      size="small"
                      disabled={isRenameBtnDisabled}
                      disableElevation
                    >
                      rename
                    </Button>
                    <Button
                      className={btnClasses.deleteBtn}
                      size="small"
                      onClick={handleDeleteState}
                      disableElevation
                    >
                      delete
                    </Button>
                  </Fade>
                </div>
              ) : null}
            </motion.div>

            <motion.div className="garage-card-right">
              <motion.div className="garage-card__icons">
                <p className="garage-card__car-count text-primary">
                  {garage.cars.length}
                </p>

                <img className="car-icon" src={carIcon} alt="car icon" />
                <img
                  className="garage-icon"
                  src={garageIcon}
                  alt="garage icon"
                />
              </motion.div>

              <Button
                className={btnClasses.modifyButton}
                size={"small"}
                disableElevation
                onClick={handleModify}
              >
                modify
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </Fade>
  );
};

export default Garage;
