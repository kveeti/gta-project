import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../state/actions";
import { styled } from "../../stitches.config";
import { BaseInput } from "../Styles/Inputs";

const StyledInput = styled(BaseInput, {
  width: "100%",
  height: "2rem",
  margin: "1rem 0.5rem 1rem 1rem",
});

export const SearchBar = () => {
  if (typeof window === "undefined") return null;

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
    <StyledInput
      white
      id="garage-input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search for cars/garages..."
      onChange={(e) => onSearchTermChange(e.target.value)}
      value={router.query.q || ""}
    />
  );
};
