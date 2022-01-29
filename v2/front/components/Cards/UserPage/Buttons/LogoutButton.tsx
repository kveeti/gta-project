import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { initState } from "../../../../state/InitState";
import { request } from "../../../../util/axios";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = async () => {
    await request("/auth/logout", "POST");
    localStorage.clear();

    await router.push("/signin", "/signin", { shallow: true });
    dispatch(actions.users.set.me(initState.users.me));
  };

  return (
    <StyledButton red onClick={onClick}>
      Logout
    </StyledButton>
  );
};
