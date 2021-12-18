import { styled } from "../../stitches.config";
import { SearchBar } from "./SearchBar";
import { ProfileButton } from "./Buttons/ProfileButton";
import { NewCarButton } from "./Buttons/NewCar";
import { NewGarageButton } from "./Buttons/NewGarage";
import { HomeButton } from "./Buttons/Home";

const MenubarContainer = styled("nav", {
  height: "5rem",
  position: "sticky",
  top: "0px",
  backgroundColor: "#212121",
  zIndex: "1",
});

const MenubarContent = styled("div", {
  margin: "0 auto",
  maxWidth: "1800px",
  display: "grid",
  gridTemplateColumns: "6fr 2fr",
  height: "100%",
});

const LeftContainer = styled("div", {
  padding: "1rem 0.5rem 1rem 1rem",
});

const RightContainer = styled("div", {
  display: "flex",
  padding: "1rem 1rem 1rem 0.5rem",
  justifyContent: "space-between",
  gap: "2rem",
  alignItems: "center",
  minWidth: "330px",
});

const LeftButtons = styled("div", {
  display: "flex",
  gap: "0.5rem",
});

export const MenuBar = () => {
  return (
    <MenubarContainer>
      <MenubarContent>
        <LeftContainer>
          <SearchBar />
        </LeftContainer>

        <RightContainer>
          <LeftButtons>
            <HomeButton />
            <NewCarButton />
            <NewGarageButton />
          </LeftButtons>
          <ProfileButton />
        </RightContainer>
      </MenubarContent>
    </MenubarContainer>
  );
};
