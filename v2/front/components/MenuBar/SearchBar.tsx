import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";
import { actions } from "../../state/actions";
import { useISelector } from "../../state/hooks";

export const SearchBar = () => {
  if (typeof window === "undefined") return null;

  const searchState = useISelector((state) => state.search);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSearchTermChange = async (value: string) => {
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
      style={{ width: "100%", height: "2.5rem", fontSize: "16px" }}
      type="search"
      autoComplete="off"
      iconPosition="left"
      icon="search"
      placeholder="Search for anything"
      value={router.query.q || ""}
      onChange={(e, { value }) => onSearchTermChange(value)}
      autoFocus
      loading={searchState.api.loading}
      error={searchState.api.notFound || searchState.api.error}
    />
  );
};
