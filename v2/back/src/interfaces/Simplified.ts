export interface SimplifiedCar {
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
  name: string;
  desc: string;
  capacity: number;
  type: string;
  amountOfCars: number;
  owner: string;
}
