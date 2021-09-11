import styled from "styled-components";
import Car from "./car/car";

const CarGrid = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 8px;
`;

const Cars = ({ cars, carType }) => {
  return (
    <CarGrid>
      {cars.map((car) => {
        return (
          <div key={car._id}>
            <Car car={car} carType={carType} />
          </div>
        );
      })}
    </CarGrid>
  );
};

export default Cars;
