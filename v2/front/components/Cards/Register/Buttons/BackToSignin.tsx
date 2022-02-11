import { StyledButton } from "../../Signin/Buttons/Styles";
import { useRouter } from "next/router";
import { paths } from "../../../../util/constants";

export const BackToSigninButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(paths.signin());
  };

  return (
    <StyledButton gray onClick={onClick} form="null">
      Back to sign in
    </StyledButton>
  );
};
