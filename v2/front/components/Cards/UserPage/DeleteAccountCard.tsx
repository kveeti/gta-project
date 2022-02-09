import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../state/actions";
import { initState } from "../../../state/InitState";
import { request } from "../../../util/axios";
import { wait } from "../../../util/wait";
import { Input } from "../../Input/Input";
import { FormWrapper } from "../../Styles/Forms";
import {
  InputContainer,
  Label,
  PageButton,
  PageButtonContainer,
  PageCard,
} from "../../Styles/Page-cards";
import { Desc, Title } from "../../Styles/Text";

export const DeleteAccountCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const res = await request("/users/me", "DELETE", {
      password,
    });

    if (!res) return;

    setPassword("");
    toast.success("Account deleted successfully");
    localStorage.clear();

    await wait(2000);

    await router.push("/signin", "/signin");
    dispatch(actions.users.set.me(initState.users.me));
  };

  return (
    <PageCard centered>
      <Title>Delete account</Title>
      <Desc>Your account will be immediately deleted and you won't be able to sign in again.</Desc>

      <InputContainer>
        <Label htmlFor="password">Password</Label>
        <Input transparent type="password" id="password" value={password} onChange={setPassword} />
      </InputContainer>

      <PageButtonContainer>
        <PageButton red onClick={onSubmit}>
          Delete account
        </PageButton>
      </PageButtonContainer>
    </PageCard>
  );
};
