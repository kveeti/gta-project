import Garage from "./garage/garage";

const Garages = ({ garages, onClick = false, location }) => {
  return (
    <>
      <div className="garage-list">
        {garages.map((garage) => {
          return (
            <div key={garage._id}>
              <Garage garage={garage} location={location} onClick={onClick} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Garages;
