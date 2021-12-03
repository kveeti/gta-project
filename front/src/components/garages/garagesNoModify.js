import GarageNoModify from "./garage/garageNoModify.js";

const GaragesNoModify = ({ garages, onClick = false, location }) => {
  return (
    <>
      <div style={{ display: "grid", gap: "8px", marginTop: "8px" }}>
        {garages.map((garage) => {
          return (
            <div key={garage._id}>
              <GarageNoModify
                garage={garage}
                location={location}
                onClick={onClick}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GaragesNoModify;
