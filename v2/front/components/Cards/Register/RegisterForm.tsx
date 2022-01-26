import { useState } from "react";
import { Input } from "../../Input/Input";
import { InputContainer, Label } from "../../Styles/Page-cards";
import { request } from "../../../util/axios";
import { useRouter } from "next/router";
import { RegisterButton } from "./Buttons/RegisterButton";
import { ButtonContainer } from "../../Styles/SinglePage";
import { BackToSigninButton } from "./Buttons/BackToLogin";

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

  const onRegisterClick = async () => {
    if (registerButtonDisabled) return;

    const res = await request("/auth/register", "POST", {
      username,
      email,
      password,
    });
    if (res) {
      router.push("/", "/", { shallow: true });
    }
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
        <RegisterButton onClick={onRegisterClick} disabled={registerButtonDisabled} />
        <BackToSigninButton />
      </ButtonContainer>
    </>
  );
};

const UsernameInput = ({ value, onChange }: InputProps) => {
  return <Input transparent id="username" type="text" onChange={onChange} value={value} />;
};

const EmailInput = ({ value, onChange }: InputProps) => {
  return <Input transparent id="email" type="email" onChange={onChange} value={value} />;
};

const PassInput = ({ value, onChange }: InputProps) => {
  return <Input transparent id="password" type="password" onChange={onChange} value={value} />;
};
