import { ICar } from "./Car";

export interface IGarage {
  id: string;
  name: string;
  desc: string;
  capacity: number;
  amountOfCars: number;
  room: number;
  full: boolean;
  type: string;
  owner: string;
}

export interface ModelGarage {
  id: string;
  name: string;
  capacity: number;
  type: string;
  alreadyOwned: boolean;
}
