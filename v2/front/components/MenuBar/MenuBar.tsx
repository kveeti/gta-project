import { styled } from "../../stitches.config";

import { SearchBar } from "./SearchBar";
import Profile from "./Profile/Profile";

const MenubarContainer = styled("nav", {
  height: "5rem",
  position: "sticky",
  top: "0px",
  backgroundColor: "#212121",
  color: "white",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

const RightSideContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  width: "430px",
});

export const MenuBar = () => {
  return (
    <MenubarContainer>
      <SearchBar />
      <RightSideContainer>
        <Profile />
      </RightSideContainer>
    </MenubarContainer>
  );
};
