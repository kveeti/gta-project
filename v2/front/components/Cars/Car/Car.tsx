import styles from "./Car.module.css";

const Car = ({ car }) => {
  return (
    <div className={styles.card}>
      <h2>{car.name}</h2>
      <p>{car.garage.name}</p>
    </div>
  );
};

export default Car;
