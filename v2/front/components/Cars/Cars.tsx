import Car from "./Car/Car";
import styles from "./Cars.module.css";

const Cars = ({ cars }) => {
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.carGrid}>
        {cars.map((car) => {
          return <Car key={car.name} car={car} />;
        })}
      </div>
    </div>
  );
};

export default Cars;
