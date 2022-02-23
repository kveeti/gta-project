import { useState } from "react";
import { Input } from "../../Common/Input/Input";
import { request } from "../../../util/axios";
import { useRouter } from "next/router";
import { RegisterButton } from "./Buttons/RegisterButton";
import { BackToSigninButton } from "./Buttons/BackToSignin";
import { FormWrapper } from "../../Common/Forms";
import { ButtonContainer, InputContainer } from "../../Common/Containers";
import { Label } from "../../Common/Text";
import { paths } from "../../../util/constants";
import { FullWidthButton } from "../../Common/Buttons";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerButtonDisabled = !username || !password || !email;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (registerButtonDisabled) return;

    const res = await request("/auth/register", "POST", {
      username,
      email,
      password,
      isTestAccount: false,
    });

    if (res) router.push(paths.home());
  };

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper>
        <InputContainer column>
          <Label column htmlFor="username">
            Username
          </Label>
          <UsernameInput value={username} onChange={setUsername} />
        </InputContainer>

        <InputContainer column>
          <Label column htmlFor="email">
            Email
          </Label>
          <EmailInput value={email} onChange={setEmail} />
        </InputContainer>

        <InputContainer column>
          <Label column htmlFor="password">
            Password
          </Label>
          <PassInput value={password} onChange={setPassword} />
        </InputContainer>

        <ButtonContainer>
          <FullWidthButton blue type="submit" disabled={registerButtonDisabled}>
            Register
          </FullWidthButton>
          <FullWidthButton gray link={paths.signin()} form="null">
            Back to sign in
          </FullWidthButton>
        </ButtonContainer>
      </FormWrapper>
    </form>
  );
};

const UsernameInput = ({ value, onChange }: InputProps) => {
  return <Input required id="username" type="text" onChange={onChange} value={value} />;
};

const EmailInput = ({ value, onChange }: InputProps) => {
  return <Input required id="email" type="email" onChange={onChange} value={value} />;
};

const PassInput = ({ value, onChange }: InputProps) => {
  return <Input required id="password" type="password" onChange={onChange} value={value} />;
};
