import { useRouter } from "next/router";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const ChangeEmailButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/me/change/email", "/me/change/email", { shallow: true });
  };

  return (
    <StyledButton blue onClick={onClick}>
      Change email
    </StyledButton>
  );
};
