import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../../util/axios";
import { Input } from "../../../Input/Input";
import { Label } from "../../../Styles/Page-cards";

export const SearchInput = ({ setMatching }) => {
  const [value, setValue] = useState("");

  const onChange = async (value: string) => {
    setValue(value);

    if (!value.length) return setMatching([]);

    const res = await request(`/modelgarages?query=${value}`, "GET");

    if (res) {
      setMatching(res.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Label htmlFor="search-model-garages">Search</Label>
      <Input
        transparent
        type="text"
        value={value}
        onChange={onChange}
        id="search-model-garages"
        placeholder="E.g. Popular street, unit 2"
      />
    </>
  );
};
