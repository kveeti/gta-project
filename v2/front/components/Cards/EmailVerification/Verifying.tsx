import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Title } from "../../Styles/Text";
import { Card } from "./Styles";

export const Verifying = () => (
  <Card>
    <Title>Verifying...</Title>

    <EnvelopeClosedIcon style={{ transform: "scale(2)" }} />
  </Card>
);
