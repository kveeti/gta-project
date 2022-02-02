import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { Input } from "../../Input/Input";
import { FormWrapper } from "../../Styles/Forms";
import { InputContainer, Label, PageButton, PageButtonContainer } from "../../Styles/Page-cards";
import { SingleCardPageCard } from "../../Styles/SinglePage";
import { Desc, Title } from "../../Styles/Text";

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

  const onBackToSignIn = () => typeof window != "undefined" && window.location.assign("/signin");

  return (
    <SingleCardPageCard>
      <Title>Reset password</Title>
      <Desc>A password reset link will be sent to this email.</Desc>
      <form onSubmit={onSubmit}>
        <FormWrapper>
          <InputContainer column>
            <Label htmlFor="email" column>
              Email
            </Label>
            <Input type="email" id="email" value={email} onChange={setEmail} transparent />
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
