import { ICar } from "./Car";

export interface IGarage {
  name: string;
  desc: string;
  cars: ICar[];
}

export interface ModelGarage {
  name: string;
  capacity: number;
  type: string;
}
