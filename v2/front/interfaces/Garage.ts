import { Car } from "./Car";

export interface Garage {
  name: string;
  desc: string;
  cars: Car[];
}

export interface ModelGarage {
  name: string;
  capacity: number;
  type: string;
}
