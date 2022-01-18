import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { Input } from "../Input/Input";

export const SearchBar = () => {
  if (typeof window === "undefined") return null;

  const dispatch = useDispatch();
  const router = useRouter();

  const onSearchTermChange = async (value: string) => {
    dispatch(actions.search.set.input(value));

    if (!value) {
      dispatch(actions.search.api.reset());
      dispatch(actions.search.set.cars([]));
      dispatch(actions.search.set.garages([]));
      return router.push("/");
    }

    router.push(
      {
        pathname: "/search",
        query: { q: value },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Input
      white
      id={"search"}
      type="search"
      placeholder="Search for anything"
      onChange={(value) => onSearchTermChange(value)}
      value={router.query.q?.toString() || ""}
    />
  );
};
