import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { styled } from "../../../../stitches.config";

const StyledIcon = styled("label", {
  all: "unset",
  display: "flex",
  padding: "0 1rem",
  transform: "scale(1.3)",
});

export const SearchIcon = () => {
  return (
    <StyledIcon htmlFor={"search"}>
      <MagnifyingGlassIcon />
    </StyledIcon>
  );
};
