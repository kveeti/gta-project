import { SimplifiedCar, SimplifiedGarage, SimplifiedUser } from "../interfaces/Simplified";
import { IdCar } from "../models/car";
import { Garage, IdGarage } from "../models/garage";
import { IdUser } from "../models/user";
import { isModelCar, isModelGarage, isPopulatedGarage, isPopulatedUser } from "./typeguards";

export const simplifyCars = (cars: IdCar[]) => {
  const list = cars.map((car) => {
    if (!isModelCar(car.modelCar)) {
      console.log(car, "no model car");
      return null;
    }
    if (!isPopulatedGarage(car.garage)) {
      console.log(car, "no populated garage");
      return null;
    }
    if (!isModelGarage(car.garage.modelGarage)) {
      console.log(car, "no model garage");
      return null;
    }
    if (!isPopulatedUser(car.owner)) {
      console.log(car, "no populated owner");
      return null;
    }

    const simplifiedCar: SimplifiedCar = {
      id: car._id,
      name: car.modelCar.name,
      manufacturer: car.modelCar.manufacturer,
      price: car.modelCar.price,
      class: car.modelCar.class,
      owner: car.owner.owner,
      garage: {
        name: car.garage.modelGarage.name,
        desc: car.garage.desc,
        type: car.garage.modelGarage.type,
        capacity: car.garage.modelGarage.capacity,
        amountOfCars: car.garage.cars.length,
      },
    };
    return simplifiedCar;
  });

  if (list.includes(null)) {
    console.log("couldnt simplify cars");
    return null;
  }

  return list;
};

export const simplifyGarages = (garages: IdGarage[]) => {
  const list = garages.map((garage) => {
    if (!isModelGarage(garage.modelGarage)) {
      console.log(garage, "no model garage");
      return null;
    }
    if (!isPopulatedUser(garage.owner)) {
      console.log(garage, "no populated owner");
      return null;
    }

    const simplifiedGarage: SimplifiedGarage = {
      id: garage._id,
      name: garage.modelGarage.name,
      desc: garage.desc,
      capacity: garage.modelGarage.capacity,
      type: garage.modelGarage.type,
      amountOfCars: garage.cars.length,
      owner: garage.owner.owner,
    };
    return simplifiedGarage;
  });

  if (list.includes(null)) {
    console.log("couldnt simplify garages");
    return null;
  }

  return list;
};

export const simplifyUser = (user: IdUser) => {
  const simplifiedUser: SimplifiedUser = {
    id: user._id,
    owner: user.owner,
    email: user.email,
    cars: simplifyCars(user.cars as unknown as IdCar[]),
    garages: simplifyGarages(user.garages as unknown as IdGarage[]),
    carCount: user.cars.length,
    garageCount: user.garages.length,
  };

  return simplifiedUser;
};
