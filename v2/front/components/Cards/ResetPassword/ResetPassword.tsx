import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { wait } from "../../../util/wait";
import { Input } from "../../Input/Input";
import { PageButton } from "../../Styles/Buttons";
import { SingleCardPageCard } from "../../Styles/Cards";
import { InputContainer, PageButtonContainer } from "../../Styles/Containers";
import { FormWrapper } from "../../Styles/Forms";
import { Label, Title } from "../../Styles/Text";
import { InvalidLink } from "./InvalidLink";

export const ResetPasswordCard = () => {
  const router = useRouter();
  const { token } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await request("/auth/reset-password", "POST", {
      passwordResetToken: token,
      newPassword,
    });

    if (res) {
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password reset successfully");

      await wait(2000);

      router.push("/signin", "/signin");
    }
  };

  if (!token) return <InvalidLink />;

  return (
    <SingleCardPageCard>
      <Title padding>Password reset</Title>

      <form onSubmit={onSubmit}>
        <FormWrapper>
          <InputContainer column>
            <Label column htmlFor="new-password">
              New password
            </Label>
            <Input
              required
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              id="new-password"
            />

            <Label column htmlFor="conf-new-password">
              Confirm new password
            </Label>
            <Input
              required
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              id="conf-new-password"
            />
          </InputContainer>

          <PageButtonContainer>
            <PageButton green type="submit">
              Reset
            </PageButton>
          </PageButtonContainer>
        </FormWrapper>
      </form>
    </SingleCardPageCard>
  );
};
