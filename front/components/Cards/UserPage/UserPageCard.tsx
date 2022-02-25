import { useGetMe } from "../../../hooks/useGetMe";
import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { paths } from "../../../util/constants";
import { FullWidthButton } from "../../Common/Buttons";
import { PageCard } from "../../Common/Cards";
import { ButtonContainer } from "../../Common/Containers";
import { Text, Title } from "../../Common/Text";
import { CreateAccountButton } from "../IndexPageCard/CreateAccountButton";
import { LogoutButton } from "./Buttons/LogoutButton";
import { ResendEmailButton } from "./Buttons/ResendEmail";

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
            {!users.me.emailVerified && <ResendEmailButton />}
            <FullWidthButton blue link={paths.changeEmail()}>
              Change email
            </FullWidthButton>
            <FullWidthButton blue link={paths.changePassword()}>
              Change password
            </FullWidthButton>
            <FullWidthButton red link={paths.deleteAccount()}>
              Delete account
            </FullWidthButton>
          </>
        ) : (
          <CreateAccountButton />
        )}

        <LogoutButton />
      </ButtonContainer>
    </PageCard>
  );
};
