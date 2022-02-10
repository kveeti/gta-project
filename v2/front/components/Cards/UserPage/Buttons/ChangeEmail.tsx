import { useRouter } from "next/router";
import { FullWidthButton } from "../../../Styles/Buttons";

export const ChangeEmailButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/me/change/email", "/me/change/email");
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Change email
    </FullWidthButton>
  );
};
