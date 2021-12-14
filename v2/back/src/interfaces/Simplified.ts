import { ObjectId } from "mongoose";

export interface SimplifiedCar {
  id: ObjectId;
  name: string;
  manufacturer: string;
  price: number;
  class: string;
  owner: string;
  garage: {
    name: string;
    desc: string;
    type: string;
    capacity: number;
    amountOfCars: number;
  };
}

export interface SimplifiedGarage {
  id: ObjectId;
  name: string;
  desc: string;
  capacity: number;
  type: string;
  amountOfCars: number;
  owner: string;
  full: boolean;
}

export interface SimplifiedUser {
  id: ObjectId;
  owner: string;
  email: string;
  cars: (SimplifiedCar | null)[] | null;
  garages: (SimplifiedGarage | null)[] | null;
  carCount: number;
  garageCount: number;
}
