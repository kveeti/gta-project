import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../../../util/axios";

interface Props {
  setName: (garage: any) => void;
  setOriginalName: (garage: any) => void;
  setCapacity: (garage: any) => void;
  setOriginalCapacity: (garage: any) => void;
  garageId: string | string[];
}

export const getGarage = async ({
  setName,
  setOriginalName,
  setCapacity,
  setOriginalCapacity,
  garageId,
}: Props) => {
  try {
    const res = await axios(config(`/modelgarages/${garageId}`, "GET"));

    if (res?.data) {
      setName(res.data.name);
      setOriginalName(res.data.name);
      setCapacity(res.data.capacity);
      setOriginalCapacity(res.data.capacity);
    }
  } catch {
    toast.error("Something went wrong");
  }
};
