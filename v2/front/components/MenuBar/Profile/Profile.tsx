import { signOut } from "next-auth/react";
import { Button, Icon, Popup } from "semantic-ui-react";
import ProfilePlaceholder from "./Placeholder";
import { useISelector } from "../../../state/hooks";
import { useDispatch } from "react-redux";
import { actions } from "../../../state/actions";

const ProfileButton = <Icon link name="user circle" size="big" style={{ paddingLeft: "0.5rem" }} />;

const ProfilePopup = () => {
  const users = useISelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <Popup
      style={{ backgroundColor: "#1c1c1d", color: "white" }}
      on="click"
      onOpen={() => {
        dispatch(actions.users.get.me());
      }}
      popperdepencies={[!!!users.api.loading]}
      trigger={ProfileButton}
      wide
      hideOnScroll
      position="bottom right"
      offset={[7, 10]}
      inverted
    >
      {users.api.loading ? (
        <ProfilePlaceholder />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "1rem" }}>{users.me.email}</label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Cars:</label>
            <label>{users.me.carCount}</label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
            <label>Garages:</label>
            <label>{users.me.garageCount}</label>
          </div>

          <Button
            style={{ marginTop: "1rem" }}
            color="red"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </Popup>
  );
};

export default ProfilePopup;
