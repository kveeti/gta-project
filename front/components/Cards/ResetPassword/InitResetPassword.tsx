import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { paths } from "../../../util/constants";
import { Input } from "../../Common/Input/Input";
import { PageButton } from "../../Common/Buttons";
import { SingleCardPageCard } from "../../Common/Cards";
import { InputContainer, PageButtonContainer } from "../../Common/Containers";
import { FormWrapper } from "../../Common/Forms";
import { Desc, Label, Title } from "../../Common/Text";

export const InitResetPasswordCard = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await request("/auth/init-password-reset", "POST", {
      email,
    });

    if (res) toast.success("Email sent!");
  };

  const onBackToSignIn = () =>
    typeof window != "undefined" && window.location.assign(paths.signin());

  return (
    <SingleCardPageCard>
      <Title padding>Reset password</Title>
      <Desc>A password reset link will be sent to this email.</Desc>
      <form onSubmit={onSubmit}>
        <FormWrapper>
          <InputContainer column>
            <Label htmlFor="email" column>
              Email
            </Label>
            <Input type="email" id="email" value={email} onChange={setEmail} />
          </InputContainer>

          <PageButtonContainer>
            <PageButton gray onClick={onBackToSignIn} form="null">
              Back to sign in
            </PageButton>
            <PageButton green type="submit">
              Send link
            </PageButton>
          </PageButtonContainer>
        </FormWrapper>
      </form>
    </SingleCardPageCard>
  );
};
