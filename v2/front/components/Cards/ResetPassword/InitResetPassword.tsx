import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { Input } from "../../Input/Input";
import { InputContainer, Label, PageButton, PageButtonContainer } from "../../Styles/Page-cards";
import { StyledCard } from "../../Styles/SinglePage";
import { Desc, Title } from "../../Styles/Text";

export const InitResetPasswordCard = () => {
  const [email, setEmail] = useState("");

  const onSendClick = async () => {
    const res = await request("/auth/init-password-reset", "POST", {
      email,
    });

    if (res) toast.success("Email sent!");
  };

  return (
    <StyledCard>
      <Title style={{ paddingBottom: "1rem" }}>Reset password</Title>
      <Desc>A link to reset your password will be sent to this email.</Desc>

      <InputContainer>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={setEmail} transparent />
      </InputContainer>

      <PageButtonContainer>
        <PageButton green onClick={onSendClick}>
          Send link
        </PageButton>
      </PageButtonContainer>
    </StyledCard>
  );
};
