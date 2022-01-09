import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { PageCard } from "../../Styles/Page-cards";
import { Text, Title } from "../../Styles/Text";

const Specs = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const UserInfo = () => {
  const { data, status } = useSession();
  const dispatch = useDispatch();
  const me = useISelector((state) => state.users.me);

  useEffect(() => {
    if (!data) return;

    dispatch(actions.users.get.me());
  }, []);

  if (status === "loading") return null;

  return (
    <PageCard>
      <Title>User info</Title>
      <Text>
        <b>{data?.user?.name}</b> - {data?.user?.email}
      </Text>
      <Specs>
        <Text>
          <b>Cars:</b> {me?.carCount}
        </Text>
        <Text>
          <b>Garages:</b> {me?.garageCount}
        </Text>
      </Specs>
    </PageCard>
  );
};
