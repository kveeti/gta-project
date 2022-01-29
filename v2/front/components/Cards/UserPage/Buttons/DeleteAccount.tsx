import { useRouter } from "next/router";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const DeleteAccountButton = () => {
  const router = useRouter();

  return (
    <StyledButton
      red
      onClick={() => {
        router.push("/me/delete", "/me/delete", { shallow: true });
      }}
    >
      Delete account
    </StyledButton>
  );
};
