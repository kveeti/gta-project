import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { Text, Title } from "../../Styles/Text";
import { CreateAccountButton } from "./Buttons/CreateAccountButton";
import { ModelCarMgmtButton } from "./Buttons/ModelCarMgmtButton";
import { ModelGarageMgmtButton } from "./Buttons/ModelGarageMgmtButton";
import { useGetMe } from "../../../hooks/useGetMe";
import { PageCard } from "../../Styles/Cards";
import { ButtonContainer } from "../../Styles/Containers";

const Specs = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const IndexPageCard = () => {
  useGetMe();

  const users = useISelector((state) => state.users);

  const isTestAccount = users?.me?.isTestAccount;
  const isAdmin = users?.me?.role === "Admin";

  return (
    <PageCard>
      {isTestAccount ? (
        <Title>{"Hello tester!"}</Title>
      ) : (
        <Title>{users?.me?.username ? `Hello ${users.me.username}!` : "Hello!"}</Title>
      )}
      {isAdmin && <Text red>Admin</Text>}
      <Specs>
        <Text>
          <b>Cars:</b> {users?.me?.carCount}
        </Text>
        <Text>
          <b>Garages:</b> {users?.me?.garageCount}
        </Text>
      </Specs>

      {isTestAccount && <CreateAccountButton />}

      {isAdmin && (
        <ButtonContainer>
          <ModelCarMgmtButton />
          <ModelGarageMgmtButton />
        </ButtonContainer>
      )}
    </PageCard>
  );
};
