import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { PageCard } from "../../Styles/Page-cards";
import { Text, Title } from "../../Styles/Text";

const Specs = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const UserInfo = () => {
  const users = useISelector((state) => state.users);

  return (
    <PageCard>
      <Title>User info</Title>
      <Text>
        <b>{users.me?.username}</b>
      </Text>
      <Specs>
        <Text>
          <b>Cars:</b> {users.me?.carCount}
        </Text>
        <Text>
          <b>Garages:</b> {users.me?.garageCount}
        </Text>
      </Specs>
    </PageCard>
  );
};
