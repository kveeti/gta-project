import { useRouter } from "next/router";
import { FullWidthButton } from "../../../Styles/Buttons";

export const ChangePasswordButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/me/change/password", "/me/change/password");
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Change password
    </FullWidthButton>
  );
};
