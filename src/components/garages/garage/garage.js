import { useDispatch, useSelector } from "react-redux";

import Rename from "./rename.js";
import { Button } from "@material-ui/core";

import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

import {
  garageRename_rename,
  garageRename_setOpenGarage,
  garageRename_setRenameBtnDisabled,
} from "../../../actions/garageRename.js";

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
    (state) => state.garageRename
  );
  const searchInput = useSelector((state) => state.search.input);

  let open = false;

  if (openGarage === garage._id) {
    open = true;
  }

  const handleModify = (e) => {
    dispatch(garageRename_setRenameBtnDisabled(true));
    if (open) {
      dispatch(garageRename_setOpenGarage(null));
      return;
    }

    dispatch(garageRename_setOpenGarage(garage._id));
  };

  const handleRename = (e) => {
    dispatch(garageRename_rename(newDesc, garage._id, searchInput));
  };

  const handleDelete = (e) => {
    console.log("delete");
  };

  return (
    <Fade duration={500}>
      <motion.div
        animate={open ? "expanded" : "collapsed"}
        variants={animation.variants}
        transition={animation.transition}
        className={`card garage-card elevation1 uppercase`}
      >
        <motion.div className="garage-card-left">
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
                  onClick={handleDelete}
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
            <img className="garage-icon" src={garageIcon} alt="garage icon" />
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
      </motion.div>
    </Fade>
  );
};

export default Garage;
