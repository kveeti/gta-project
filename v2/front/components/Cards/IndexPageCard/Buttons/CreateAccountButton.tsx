import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ButtonContainer } from "../../../Styles/SinglePage";
import { StyledButton } from "../../Signin/Buttons/Styles";
import { requestWithNo401RedirectAndDontSetToken } from "../../../../util/axios";
import { actions } from "../../../../state/actions";
import { initState } from "../../../../state/InitState";

export const CreateAccountButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = async () => {
    await requestWithNo401RedirectAndDontSetToken("/auth/logout", "POST");
    localStorage.clear();

    await router.push("/register", "/register");
    dispatch(actions.users.set.me(initState.users.me));
  };

  return (
    <ButtonContainer>
      <StyledButton green onClick={onClick}>
        Create an actual account
      </StyledButton>
    </ButtonContainer>
  );
};
