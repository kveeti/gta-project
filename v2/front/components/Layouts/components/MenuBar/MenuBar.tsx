import { SearchBar } from "./SearchBar";
import { ProfileButton } from "./Buttons/ProfileButton";
import { NewCarButton } from "./Buttons/NewCar";
import { NewGarageButton } from "./Buttons/NewGarage";
import { HomeButton } from "./Buttons/Home";
import { useISelector } from "../../../../state/hooks";
import {
  MenubarContainer,
  MenubarContent,
  LeftContainer,
  RightContainer,
  LeftButtons,
} from "./Styles";

export const MenuBar = ({ mobile }) => {
  const users = useISelector((state) => state.users);

  return (
    <MenubarContainer>
      <MenubarContent>
        <LeftContainer>
          <SearchBar />
        </LeftContainer>

        {mobile ? (
          <ProfileButton style={{ margin: "0.5rem 0.4rem 0 0.5rem" }} />
        ) : (
          <RightContainer>
            <LeftButtons>
              <HomeButton />
              {users.me?.garageCount !== 0 && <NewCarButton />}
              <NewGarageButton />
            </LeftButtons>
            <ProfileButton />
          </RightContainer>
        )}
      </MenubarContent>
    </MenubarContainer>
  );
};
