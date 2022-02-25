import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { paths } from "../../../../util/constants";
import { Input } from "../../../Common/Input/Input";

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
      return router.push(paths.home());
    }

    router.push({
      pathname: "/search",
      query: { q: value },
    });
  };

  return (
    <Input
      maxHeight
      white
      autoFocus
      id={"search"}
      type="search"
      placeholder="Search for anything"
      onChange={(value) => onSearchTermChange(value)}
      value={router.query.q?.toString() || ""}
    />
  );
};
