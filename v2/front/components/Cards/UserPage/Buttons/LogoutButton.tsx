import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actions } from "../../../../state/actions";
import { request } from "../../../../util/axios";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Styles/Buttons";
import { ButtonText } from "../../../Styles/Text";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = async () => {
    await request("/auth/logout", "POST");
    localStorage.clear();

    await router.push(paths.signin());
    dispatch(actions.reset.resetState());
  };

  return (
    <FullWidthButton red onClick={onClick}>
      <ButtonText>Logout</ButtonText>
    </FullWidthButton>
  );
};
