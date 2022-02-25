import DescInput from "./inputs/descInput";
import NameInput from "./inputs/nameInput";
import CreateButton from "./buttons/createButton";
import ClearButton from "./buttons/clearButton";

import { Fade } from "react-awesome-reveal";

const NewGarage = () => {
  return (
    <div className="card new-card">
      <p className="text-title uppercase">New garage</p>
      <div className="new-card-inputs">
        <Fade>
          <NameInput />
        </Fade>

        <Fade>
          <DescInput />
        </Fade>
      </div>

      <div className="new-card-actions">
        <ClearButton />
        <CreateButton />
      </div>
    </div>
  );
};

export default NewGarage;
