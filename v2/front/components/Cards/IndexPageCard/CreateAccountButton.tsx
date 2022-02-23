import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { requestWithNo401RedirectAndDontSetToken } from "../../../util/axios";
import { actions } from "../../../state/actions";
import { initState } from "../../../state/InitState";
import { FullWidthButton } from "../../Common/Buttons";
import { paths } from "../../../util/constants";

export const CreateAccountButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = async () => {
    await requestWithNo401RedirectAndDontSetToken("/auth/logout", "POST");
    localStorage.clear();

    await router.push(paths.register());
    dispatch(actions.users.set.me(initState.users.me));
  };

  return (
    <FullWidthButton green onClick={onClick}>
      Create an account
    </FullWidthButton>
  );
};
