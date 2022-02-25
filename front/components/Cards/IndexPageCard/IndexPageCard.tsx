import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { Text, Title } from "../../Common/Text";
import { CreateAccountButton } from "./CreateAccountButton";
import { useGetMe } from "../../../hooks/useGetMe";
import { PageCard } from "../../Common/Cards";
import { ButtonContainer } from "../../Common/Containers";
import { paths } from "../../../util/constants";
import { FullWidthButton } from "../../Common/Buttons";

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

  const bp = useISelector((state) => state.bp);
  const tablet = bp === 2;

  const showFirstGarageBtn = !!!users?.me?.garageCount;
  const showFirstCarBtn = !!!users?.me?.carCount && !showFirstGarageBtn;

  const showButtonContainer = isAdmin || showFirstGarageBtn || showFirstCarBtn || isTestAccount;

  return (
    <PageCard fullWidth={tablet}>
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

      {showButtonContainer && (
        <ButtonContainer>
          {showFirstGarageBtn && (
            <FullWidthButton blue link={paths.newGarage()}>
              Add your first garage
            </FullWidthButton>
          )}
          {showFirstCarBtn && (
            <FullWidthButton blue link={paths.newCar()}>
              Add your first car
            </FullWidthButton>
          )}
          {isTestAccount && <CreateAccountButton />}

          {isAdmin && (
            <>
              <FullWidthButton blue link={paths.mgmtModelCarIndex()}>
                Manage model cars
              </FullWidthButton>
              <FullWidthButton blue link={paths.mgmtModelGarageIndex()}>
                Manage model garages
              </FullWidthButton>
            </>
          )}
        </ButtonContainer>
      )}
    </PageCard>
  );
};
