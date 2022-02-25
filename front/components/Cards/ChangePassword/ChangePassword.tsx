import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { msgs } from "../../../util/constants";
import { Input } from "../../Common/Input/Input";
import { PageButton } from "../../Common/Buttons";
import { PageCard } from "../../Common/Cards";
import { InputContainer, PageButtonContainer } from "../../Common/Containers";
import { FormWrapper } from "../../Common/Forms";
import { Label, Title } from "../../Common/Text";

export const ChangePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasswordDisabled = !currPassword || !newPassword || !confirmPassword;
  const newPasswordsMatch = newPassword === confirmPassword;

  const reset = () => {
    setCurrPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (changePasswordDisabled) return toast.error(msgs.error.fillAllFields);
    if (!newPasswordsMatch) return toast.error(msgs.error.passNoMatch);

    const res = await request("/auth/change-password", "PATCH", {
      currentPassword: currPassword,
      newPassword,
    });

    if (res) {
      toast.success(msgs.success.passChanged);
      reset();
    }
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>Change password</Title>

      <form onSubmit={onSubmit}>
        <FormWrapper>
          <InputContainer>
            <Label htmlFor="current-password">Current password</Label>
            <Input
              required
              type="password"
              id="current-password"
              onChange={setCurrPassword}
              value={currPassword}
            />

            <Label htmlFor="new-password">New password</Label>
            <Input
              required
              type="password"
              id="new-password"
              onChange={setNewPassword}
              value={newPassword}
            />

            <Label htmlFor="confirm-password">New password again</Label>
            <Input
              required
              type="password"
              id="confirm-password"
              onChange={setConfirmPassword}
              value={confirmPassword}
            />
          </InputContainer>

          <PageButtonContainer>
            <PageButton green disabled={changePasswordDisabled || !newPasswordsMatch} type="submit">
              Change password
            </PageButton>
          </PageButtonContainer>
        </FormWrapper>
      </form>
    </PageCard>
  );
};
