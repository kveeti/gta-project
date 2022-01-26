import { Text, Title } from "../../Styles/Text";
import { Card } from "./Styles";

interface Props {
  reason: string;
}

export const Failed = ({ reason }: Props) => (
  <Card>
    <Title>Verification failed</Title>

    <Text>{reason}</Text>
  </Card>
);
