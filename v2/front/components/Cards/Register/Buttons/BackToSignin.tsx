import { StyledButton } from "../../Signin/Buttons/Styles";
import { useRouter } from "next/router";

export const BackToSigninButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/signin", "/signin");
  };

  return (
    <StyledButton gray onClick={onClick} form="null">
      Back to sign in
    </StyledButton>
  );
};
