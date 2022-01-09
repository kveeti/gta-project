import { styled } from "../../stitches.config";
import { SearchBar } from "./SearchBar";
import { ProfileButton } from "./Buttons/ProfileButton";
import { NewCarButton } from "./Buttons/NewCar";
import { NewGarageButton } from "./Buttons/NewGarage";
import { HomeButton } from "./Buttons/Home";
import { useISelector } from "../../state/hooks";

const MenubarContainer = styled("nav", {
  height: "5rem",
  position: "sticky",
  top: "0px",
  backgroundColor: "#212121",
  zIndex: "1",

  "@tablet": {
    height: "4rem",
  },
});

const MenubarContent = styled("div", {
  margin: "0 auto",
  maxWidth: "1800px",
  display: "grid",
  gridTemplateColumns: "6fr 2fr",
  height: "100%",

  "@mobile": {
    gridTemplateColumns: "10fr 1fr",
  },
});

const LeftContainer = styled("div", {
  padding: "1rem 0.5rem 1rem 1rem",

  "@tablet": {
    padding: "0.5rem 0rem 0.5rem 0.5rem",
  },
});

const RightContainer = styled("div", {
  display: "flex",
  padding: "1rem 1rem 1rem 0.5rem",
  justifyContent: "space-between",
  gap: "2rem",
  alignItems: "center",
  minWidth: "330px",

  "@tablet": {
    minWidth: "330px",
    padding: "0.5rem",
  },

  "@mobile": {
    minWidth: "49px",
    padding: "0 20",
  },
});

const LeftButtons = styled("div", {
  display: "flex",
  gap: "0.5rem",
});

export const MenuBar = ({ mobile }) => {
  const me = useISelector((state) => state.users.me);

  return (
    <MenubarContainer>
      <MenubarContent>
        <LeftContainer>
          <SearchBar />
        </LeftContainer>

        <RightContainer>
          {mobile ? (
            <HomeButton />
          ) : (
            <>
              <LeftButtons>
                <HomeButton />
                {me.carCount && <NewCarButton />}
                <NewGarageButton />
              </LeftButtons>
              <ProfileButton />
            </>
          )}
        </RightContainer>
      </MenubarContent>
    </MenubarContainer>
  );
};
