import { useRouter } from "next/router";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const ChangePasswordButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/me/change/password", "/me/change/password", { shallow: true });
  };

  return (
    <StyledButton blue onClick={onClick}>
      Change password
    </StyledButton>
  );
};
