import { MicrosoftBoolean } from "./MicrosoftBoolean";

export interface User {
  id: string;
  email: string;
  username: string;
  role: "Admin" | "Standard";
  emailVerified: MicrosoftBoolean;
  isTestAccount: MicrosoftBoolean;
}
