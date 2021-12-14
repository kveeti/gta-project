import { signOut } from "next-auth/react";
import { Placeholder, Button } from "semantic-ui-react";

const ProfilePlaceholder = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Placeholder style={{ minWidth: "20ch" }} inverted>
      <Placeholder.Header style={{ overflow: "visible", marginBottom: "1rem" }}>
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="short" />
        <Placeholder.Line length="short" />
      </Placeholder.Paragraph>
    </Placeholder>
    <Button style={{ marginTop: "1rem" }} color="red" onClick={() => signOut()}>
      Logout
    </Button>
  </div>
);

export default ProfilePlaceholder;
