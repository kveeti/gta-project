import { ICar } from "./Car";

export interface IGarage {
  id: string;
  name: string;
  desc: string;
  capacity: number;
  cars: ICar[];
  type: string;
  owner: string;
}

export interface IGarageDeep extends IGarage {
  cars: ICar[];
}

export interface ModelGarage {
  id: string;
  name: string;
  capacity: number;
  type: string;
  alreadyOwned: boolean;
}
