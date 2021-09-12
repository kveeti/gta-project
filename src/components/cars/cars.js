import Car from "./car/car";

const Cars = ({ cars, carType }) => {
  return (
    <div className="car-grid">
      {cars.map((car) => {
        return (
          <div key={car._id}>
            <Car car={car} carType={carType} />
          </div>
        );
      })}
    </div>
  );
};

export default Cars;
