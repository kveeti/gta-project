import { SimplifiedCar } from "./Simplified";

export interface ErrorCar extends SimplifiedCar {
  reason: string;
}
