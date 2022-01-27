import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { PageCard } from "../../Styles/Page-cards";
import { Text, Title } from "../../Styles/Text";
import { actions } from "../../../state/actions";
import { CreateAccountButton } from "./Buttons/CreateAccountButton";
import { ModelCarMgmtButton } from "./Buttons/ModelCarMgmtButton";
import { ModelGarageMgmtButton } from "./Buttons/ModelGarageMgmtButton";
import { ButtonContainer } from "../../Styles/SinglePage";

const Specs = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const IndexPageCard = () => {
  const dispatch = useDispatch();
  const users = useISelector((state) => state.users);

  const isTestAccount = users?.me?.isTestAccount;
  const isAdmin = users?.me?.role === "Admin";

  useEffect(() => {
    dispatch(actions.users.get.me());
  }, []);

  return (
    <PageCard centered>
      <Title>{users?.me?.username ? `Hello ${users.me.username}!` : "Hello!"}</Title>
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
