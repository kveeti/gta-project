import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ButtonContainer } from "../../Styles/SinglePage";
import { StyledButton } from "../Signin/Buttons/Styles";
import { config } from "../../../util/axios";
import { actions } from "../../../state/actions";
import { initState } from "../../../state/InitState";
import { setAccessToken } from "../../../util/accessToken";

export const CreateAccountButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = async () => {
    await axios(config("/auth/logout", "POST")).catch(() => null);
    localStorage.clear();
    setAccessToken(null);

    await router.push("/register", "/register", { shallow: true });
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
