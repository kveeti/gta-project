import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { PageCard } from "../../Styles/Page-cards";
import { Text, Title } from "../../Styles/Text";
import { config } from "../../../util/axios";
import { actions } from "../../../state/actions";

const Specs = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const UserInfo = () => {
  const dispatch = useDispatch();
  const users = useISelector((state) => state.users);

  useEffect(() => {
    const getMe = async () => {
      const res = await axios(config("/users/me", "GET")).catch(() => null);

      if (res?.data) dispatch(actions.users.set.me(res.data));
    };

    getMe();
  }, []);

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
