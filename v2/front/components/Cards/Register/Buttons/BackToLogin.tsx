import { StyledButton } from "../../Signin/Buttons/Styles";
import { useRouter } from "next/router";

export const BackToSigninButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/signin", "/signin", { shallow: true });
  };

  return (
    <StyledButton gray onClick={onClick}>
      Back to sign in
    </StyledButton>
  );
};
