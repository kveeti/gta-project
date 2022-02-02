import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../util/axios";
import { Input } from "../../Input/Input";
import { FormWrapper } from "../../Styles/Forms";
import {
  InputContainer,
  Label,
  PageButton,
  PageButtonContainer,
  PageCard,
} from "../../Styles/Page-cards";
import { Title } from "../../Styles/Text";

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

    if (changePasswordDisabled) return toast.error("Please fill out all fields");
    if (!newPasswordsMatch) return toast.error("New passwords do not match");

    const res = await request("/auth/change-password", "PATCH", {
      currentPassword: currPassword,
      newPassword,
    });

    if (res) {
      toast.success("Password changed successfully!");
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
              transparent
              required
              type="password"
              id="current-password"
              onChange={setCurrPassword}
              value={currPassword}
            />

            <Label htmlFor="new-password">New password</Label>
            <Input
              transparent
              required
              type="password"
              id="new-password"
              onChange={setNewPassword}
              value={newPassword}
            />

            <Label htmlFor="confirm-password">New password again</Label>
            <Input
              transparent
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
