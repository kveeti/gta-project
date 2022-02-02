import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { Input } from "../../Input/Input";
import { FormWrapper } from "../../Styles/Forms";
import { InputContainer, Label, PageButton, PageButtonContainer } from "../../Styles/Page-cards";
import { StyledCard } from "../../Styles/SinglePage";
import { Desc, Title } from "../../Styles/Text";

export const InitResetPasswordCard = () => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await request("/auth/init-password-reset", "POST", {
      email,
    });

    if (res) toast.success("Email sent!");
  };

  return (
    <StyledCard>
      <Title>Reset password</Title>
      <Desc>A password reset link will be sent to this email.</Desc>

      <form onSubmit={onSubmit}>
        <FormWrapper>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input required type="email" id="email" value={email} onChange={setEmail} transparent />
          </InputContainer>

          <PageButtonContainer>
            <PageButton green type="submit">
              Send link
            </PageButton>
          </PageButtonContainer>
        </FormWrapper>
      </form>
    </StyledCard>
  );
};
