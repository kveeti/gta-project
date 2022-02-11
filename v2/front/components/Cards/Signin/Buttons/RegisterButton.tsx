import { StyledButton } from "./Styles";
import { useRouter } from "next/router";
import { paths } from "../../../../util/constants";

export const RegisterButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(paths.register());
  };

  return (
    <StyledButton gray onClick={onClick} form="null">
      Register
    </StyledButton>
  );
};
