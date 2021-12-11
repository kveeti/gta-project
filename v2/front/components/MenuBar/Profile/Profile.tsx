import { useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { Button, Icon, Popup } from "semantic-ui-react";
import ProfilePlaceholder from "./Placeholder";

interface data {
  email: string;
  cars: number;
  garages: number;
}

const ProfileButton = (
  <Icon link name="user circle" size="big" style={{ margin: "0", padding: "0" }} />
);

const ProfilePopup = () => {
  const [data, setData] = useState<null | data>(null);
  const timer = useRef<any>();

  return (
    <Popup
      style={{ backgroundColor: "#1c1c1d", color: "white" }}
      on="click"
      onClose={() => setData(null)}
      onOpen={() => {
        setData(null);

        timer.current = setTimeout(() => {
          setData({
            email: "test@test.test",
            cars: 3,
            garages: 4,
          });
        }, 5000);
      }}
      popperDepencies={[!!data]}
      trigger={ProfileButton}
      wide
      hideOnScroll
      offset={[3.2, 5]}
      position="bottom right"
      inverted
    >
      {data === null ? (
        <ProfilePlaceholder />
      ) : (
        <>
          <p>{data.email}</p>
          cars: <label>{data.cars}</label> <br />
          garages: <label>{data.garages}</label> <br />
          <Button
            color="red"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Popup>
  );
};

export default ProfilePopup;
