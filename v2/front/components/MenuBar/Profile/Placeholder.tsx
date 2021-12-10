import { Placeholder, Button } from "semantic-ui-react";

const ProfilePlaceholder = () => (
  <>
    <Placeholder style={{ minWidth: "100px" }} inverted>
      <Placeholder.Header>
        <Placeholder.Line length="full" />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="medium" />
      </Placeholder.Paragraph>
    </Placeholder>
    <Button style={{ marginTop: "1rem" }} color="red" disabled>
      Logout
    </Button>
  </>
);

export default ProfilePlaceholder;
