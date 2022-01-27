import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { PageCard } from "../../Styles/Page-cards";
import { ButtonContainer } from "../../Styles/SinglePage";
import { Text, Title } from "../../Styles/Text";
import { CreateAccountButton } from "../IndexPageCard/Buttons/CreateAccountButton";
import { ChangeEmailButton } from "./Buttons/ChangeEmail";
import { ChangePasswordButton } from "./Buttons/ChangePasswordButton";
import { LogoutButton } from "./Buttons/LogoutButton";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
});

export const UserPageCard = () => {
  const users = useISelector((state) => state.users);

  return (
    <PageCard centered>
      <Title>Your information</Title>
      <Div>
        <Text>
          <b>Email: </b>
          {users?.me?.email && (
            <>
              {users?.me?.email}
              {users?.me?.emailVerified ? (
                <Text green> (verified)</Text>
              ) : (
                <Text red> (not verified)</Text>
              )}
            </>
          )}
        </Text>

        <Text>
          <b>Username: </b>
          {users?.me?.username}
        </Text>
      </Div>

      <Div>
        <Text>
          <b>Cars: </b>
          {users?.me?.carCount}
        </Text>

        <Text>
          <b>Garages: </b>
          {users?.me?.garageCount}
        </Text>
      </Div>

      <ButtonContainer>
        {!users?.me?.isTestAccount ? (
          <>
            <ChangeEmailButton />
            <ChangePasswordButton />
            <LogoutButton />
          </>
        ) : (
          <CreateAccountButton />
        )}
      </ButtonContainer>
    </PageCard>
  );
};
