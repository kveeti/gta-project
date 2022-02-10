import { useState } from "react";
import { request } from "../../../../../util/axios";
import { Input } from "../../../../Input/Input";
import { Label } from "../../../../Styles/Page-cards";

export const SearchInput = ({ setMatching }) => {
  const [value, setValue] = useState("");

  const onChange = async (value: string) => {
    setValue(value);

    if (!value.length) return setMatching([]);

    const res = await request(`/modelcars?query=${value}`, "GET");

    if (res && res?.data) setMatching(res.data);
  };

  return (
    <>
      <Label htmlFor="search-model-cars">Search</Label>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        id="search-model-cars"
        placeholder="E.g. 8f Drafter"
      />
    </>
  );
};
