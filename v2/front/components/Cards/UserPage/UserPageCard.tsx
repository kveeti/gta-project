import { useGetMe } from "../../../hooks/useGetMe";
import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { PageCard } from "../../Styles/Cards";
import { ButtonContainer } from "../../Styles/Containers";
import { Text, Title } from "../../Styles/Text";
import { CreateAccountButton } from "../IndexPageCard/Buttons/CreateAccountButton";
import { ChangeEmailButton } from "./Buttons/ChangeEmail";
import { ChangePasswordButton } from "./Buttons/ChangePasswordButton";
import { DeleteAccountButton } from "./Buttons/DeleteAccount";
import { LogoutButton } from "./Buttons/LogoutButton";

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.5rem",
});

export const UserPageCard = () => {
  const users = useISelector((state) => state.users);
  useGetMe();

  return (
    <PageCard centered>
      <Title>Profile</Title>
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
            <DeleteAccountButton />
          </>
        ) : (
          <CreateAccountButton />
        )}

        <LogoutButton />
      </ButtonContainer>
    </PageCard>
  );
};
