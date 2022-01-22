import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { initState } from "../../../../state/InitState";
import { setAccessToken } from "../../../../util/accessToken";
import { config } from "../../../../util/axios";
import { ButtonContainer } from "../../../Styles/SinglePage";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = async () => {
    await axios(config("/auth/logout", "POST")).catch(() => null);
    localStorage.clear();
    setAccessToken(null);

    await router.push("/", "/", { shallow: true });
    dispatch(actions.users.set.me(initState.users.me));
  };

  return (
    <StyledButton red onClick={onClick}>
      Logout
    </StyledButton>
  );
};
