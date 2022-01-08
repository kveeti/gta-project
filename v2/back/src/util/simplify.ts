import {
  SimpliefiedModelGarage,
  SimplifiedCar,
  SimplifiedGarage,
  SimplifiedModelCar,
  SimplifiedUser,
} from "../interfaces/Simplified";
import { IdCar } from "../models/car";
import { GarageDoc, IdGarage } from "../models/garage";
import { IdModelCar } from "../models/ModelCar";
import { IdModelGarage } from "../models/ModelGarage";
import { IdUser } from "../models/user";
import { isIdModelGarage, isModelCar, isPopulatedGarage, isPopulatedUser } from "./typeguards";

export const simplifyCars = (cars: IdCar[]) => {
  const list = cars.map((car) => {
    if (!isModelCar(car.modelCar)) {
      throw new Error("couldn't simplify owned cars, car.modelCar wasn't populated");
    }
    if (!isPopulatedGarage(car.garage)) {
      throw new Error("couldn't simplify owned cars, car.garage wasn't populated");
    }
    if (!isIdModelGarage(car.garage.modelGarage)) {
      throw new Error("couldn't simplify owned cars, car.garage.modelGarage wasn't populated");
    }
    if (!isPopulatedUser(car.owner)) {
      throw new Error("couldn't simplify owned cars, car.owner wasn't populated");
    }

    const simplifiedCar: SimplifiedCar = {
      id: car._id,
      name: car.modelCar.name,
      manufacturer: car.modelCar.manufacturer,
      price: car.modelCar.price,
      class: getClass(car.modelCar.class),
      owner: car.owner.owner,
      garage: {
        id: car.garage._id,
        name: car.garage.modelGarage.name,
        desc: car.garage.desc,
        type: car.garage.modelGarage.type,
        capacity: car.garage.modelGarage.capacity,
        amountOfCars: car.garage.cars.length,
      },
    };
    return simplifiedCar;
  });

  return list;
};

const getClass = (original: string) => {
  if (original === "ssports") return "sports";

  return original;
};

export const simplifyGarages = (garages: IdGarage[]) => {
  if (!garages.length) return [];

  return garages.map((garage) => {
    if (!isIdModelGarage(garage.modelGarage)) {
      throw new Error("couldn't simplify owned garages, modelGarage wasn't populated");
    }
    if (!isPopulatedUser(garage.owner)) {
      throw new Error("couldn't simplify owned garages, owner wasn't populated");
    }

    const simplifiedGarage: SimplifiedGarage = {
      id: garage._id,
      modelId: garage.modelGarage._id,
      name: garage.modelGarage.name,
      desc: garage.desc,
      capacity: garage.modelGarage.capacity,
      amountOfCars: garage.cars.length,
      full: garage.cars.length >= garage.modelGarage.capacity,
      room: garage.modelGarage.capacity - garage.cars.length,
      type: garage.modelGarage.type,
      owner: garage.owner.owner,
    };
    return simplifiedGarage;
  });
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

export const simplifyModelCars = (cars: IdModelCar[]) => {
  const simplified = cars.map((car) => {
    const simplified: SimplifiedModelCar = {
      id: car._id,
      name: car.name,
      manufacturer: car.manufacturer,
      price: car.price,
      class: getClass(car.class),
    };

    return simplified;
  });

  return simplified;
};

export const simplifyModelGarages = (garages: IdModelGarage[], ownedGarages: GarageDoc[]) => {
  const simplified = garages.map((garage) => {
    const simplified: SimpliefiedModelGarage = {
      id: garage._id,
      name: garage.name,
      capacity: garage.capacity,
      type: garage.type,
      alreadyOwned: isAlreadyOwned(garage, ownedGarages),
    };

    return simplified;
  });

  return simplified;
};

const isAlreadyOwned = (modelGarage: IdModelGarage, ownedGarages: GarageDoc[]) => {
  if (!ownedGarages.length) return false;
  const res = ownedGarages.some((ownedGarage) => {
    if (!isIdModelGarage(ownedGarage.modelGarage))
      throw new Error(
        "failed simplifying model garages, ownedGarage.modelGarage was not populated"
      );

    return "" + ownedGarage.modelGarage._id === "" + modelGarage._id;
  });

  return res;
};
