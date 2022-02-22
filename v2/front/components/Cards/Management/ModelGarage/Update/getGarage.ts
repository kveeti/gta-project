import { request } from "../../../../../util/axios";

interface Props {
  setName: (garage: any) => void;
  setOriginalName: (garage: any) => void;
  setCapacity: (garage: any) => void;
  setOriginalCapacity: (garage: any) => void;
  garageId: string | undefined;
}

export const getGarage = async ({
  setName,
  setOriginalName,
  setCapacity,
  setOriginalCapacity,
  garageId,
}: Props) => {
  if (!garageId) return;
  const res = await request(`/modelgarages/${garageId}`, "GET");

  if (res) {
    setName(res.data.name);
    setOriginalName(res.data.name);
    setCapacity(res.data.capacity);
    setOriginalCapacity(res.data.capacity);
  }
};
