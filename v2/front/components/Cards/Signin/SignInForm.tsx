import { useState } from "react";
import { Input } from "../../Input/Input";
import { InputContainer, Label } from "../../Styles/Page-cards";
import { SigninButton } from "./Buttons/SigninButton";
import { useRouter } from "next/router";
import { TestButton } from "./Buttons/TestButton";
import { RegisterButton } from "./Buttons/RegisterButton";
import { ButtonContainer } from "../../Styles/SinglePage";
import { request } from "../../../util/axios";
import { Text } from "../../Styles/Text";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SignInForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signInButtonDisabled = !username || !password;

  const onSignInClick = async () => {
    if (signInButtonDisabled) return;
    const res = await request("/auth/login", "POST", {
      username,
      password,
    });

    if (res) router.push("/", "/", { shallow: true });
  };

  return (
    <>
      <InputContainer column>
        <Label column htmlFor="username">
          Username
        </Label>
        <UsernameInput value={username} onChange={setUsername} />
      </InputContainer>

      <InputContainer column>
        <Label column htmlFor="password">
          Password
        </Label>
        <PassInput value={password} onChange={setPassword} />
      </InputContainer>

      <Text>
        <a href="/init-password-reset">Forgot password?</a>
      </Text>

      <ButtonContainer>
        <SigninButton onClick={onSignInClick} disabled={signInButtonDisabled} />

        <ButtonContainer row>
          <TestButton />
          <RegisterButton />
        </ButtonContainer>
      </ButtonContainer>
    </>
  );
};

const UsernameInput = ({ value, onChange }: InputProps) => {
  return <Input transparent id="username" type="text" onChange={onChange} value={value} />;
};

const PassInput = ({ value, onChange }: InputProps) => {
  return <Input transparent id="password" type="password" onChange={onChange} value={value} />;
};
