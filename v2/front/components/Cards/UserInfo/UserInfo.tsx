import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useISelector } from "../../../state/hooks";
import { styled } from "../../../stitches.config";
import { PageCard } from "../../Styles/Page-cards";
import { Text, Title } from "../../Styles/Text";
import { config } from "../../../util/axios";
import { actions } from "../../../state/actions";
import { CreateAccountButton } from "./CreateAccountButton";
import { siteBaseUrl } from "../../../envs";

const Specs = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const UserInfo = () => {
  const dispatch = useDispatch();
  const users = useISelector((state) => state.users);

  const isTestAccount =
    users?.me?.email && users.me.email.includes("test-account", `@${siteBaseUrl}`);

  const isAdmin = users?.me?.role === "Admin";

  useEffect(() => {
    const getMe = async () => {
      const res = await axios(config("/users/me", "GET")).catch(() => null);

      if (res?.data) dispatch(actions.users.set.me(res.data));
    };

    getMe();
  }, []);

  return (
    <PageCard centered>
      <Title>{users?.me?.username ? `Hello ${users?.me?.username}!` : "Hello!"}</Title>
      {isAdmin && <Text red>Admin</Text>}
      <Specs>
        <Text>
          <b>Cars:</b> {users.me?.carCount}
        </Text>
        <Text>
          <b>Garages:</b> {users.me?.garageCount}
        </Text>
      </Specs>

      {isTestAccount && <CreateAccountButton />}
    </PageCard>
  );
};
