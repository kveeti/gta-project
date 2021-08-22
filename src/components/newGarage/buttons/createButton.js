import clsx from "clsx";

import { useSelector, useDispatch } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core/";

import { newGarage_addGarage } from "../../../actions/newGarage.js";
import { useBtnStyles } from "../../../styles/buttonStyles.js";

const CreateButton = () => {
  const btnClasses = useBtnStyles();
  const dispatch = useDispatch();

  const api = useSelector((state) => state.newGarage.api);

  const newGaragename = useSelector((state) => state.newGarage.name);
  const newGarageDesc = useSelector((state) => state.newGarage.desc);

  const buttonClassname = clsx({
    [btnClasses.buttonSuccess]: api.success,
    [btnClasses.buttonFailure]: api.failure,
    [btnClasses.buttons]: !api.success && !api.failure,
  });

  const handleClick = async (e) => {
    dispatch(newGarage_addGarage(newGaragename, newGarageDesc));
  };

  return (
    <>
      <div className={btnClasses.ccRoot}>
        <div className={btnClasses.ccWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disableElevation
            disabled={
              (!newGarageDesc && !newGaragename) || api.loading ? true : false
            }
            onClick={handleClick}
          >
            Create
          </Button>
          {api.loading && (
            <CircularProgress size={24} className={btnClasses.buttonProgress} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateButton;
