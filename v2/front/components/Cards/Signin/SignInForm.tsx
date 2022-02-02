import { FormEvent, useState } from "react";
import { Input } from "../../Input/Input";
import { InputContainer, Label } from "../../Styles/Page-cards";
import { SigninButton } from "./Buttons/SigninButton";
import { useRouter } from "next/router";
import { TestButton } from "./Buttons/TestButton";
import { RegisterButton } from "./Buttons/RegisterButton";
import { ButtonContainer } from "../../Styles/SinglePage";
import { request } from "../../../util/axios";
import { Text } from "../../Styles/Text";
import { FormWrapper } from "../../Styles/Forms";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SignInForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signInButtonDisabled = !username || !password;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (signInButtonDisabled) return;

    const res = await request("/auth/login", "POST", {
      username,
      password,
    });

    if (res) router.push("/", "/", { shallow: true });
  };

  return (
    <form onSubmit={onSubmit}>
      <FormWrapper>
        <InputContainer column>
          <Label column htmlFor="username">
            Username
          </Label>
          <UsernameInput value={username} onChange={setUsername} />

          <Label column htmlFor="password">
            Password
          </Label>
          <PassInput value={password} onChange={setPassword} />
        </InputContainer>

        <Text>
          <a href="/init-password-reset">Forgot password?</a>
        </Text>

        <ButtonContainer>
          <SigninButton onClick={() => {}} disabled={signInButtonDisabled} />

          <ButtonContainer row>
            <TestButton />
            <RegisterButton />
          </ButtonContainer>
        </ButtonContainer>
      </FormWrapper>
    </form>
  );
};

const UsernameInput = ({ value, onChange }: InputProps) => {
  return <Input required transparent id="username" type="text" onChange={onChange} value={value} />;
};

const PassInput = ({ value, onChange }: InputProps) => {
  return (
    <Input required transparent id="password" type="password" onChange={onChange} value={value} />
  );
};
