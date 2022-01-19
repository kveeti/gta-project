import { StyledButton } from "./Styles";
import { useRouter } from "next/router";

export const RegisterButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/register", "/register", { shallow: true });
  };

  return (
    <StyledButton gray onClick={onClick}>
      Register
    </StyledButton>
  );
};
