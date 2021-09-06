import Car from "./car/car";

const Cars = ({ cars, carType }) => {
  return (
    <div className="car-grid-wrapper">
      {cars.map((car) => {
        return <Car car={car} carType={carType} />;
      })}
    </div>
  );
};

export default Cars;
