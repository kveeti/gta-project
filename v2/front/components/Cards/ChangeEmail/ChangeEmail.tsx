import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { request } from "../../../util/axios";
import { Input } from "../../Common/Input/Input";
import { PageButton } from "../../Common/Buttons";
import { PageCard } from "../../Common/Cards";
import { InputContainer, PageButtonContainer } from "../../Common/Containers";
import { FormWrapper } from "../../Common/Forms";
import { Label, Title } from "../../Common/Text";

export const ChangeEmailCard = () => {
  const [newEmail, setNewEmail] = useState("");
  const me = useISelector((state) => state.users.me);
  const dispatch = useDispatch();

  const buttonDisabled = newEmail.length < 1 || newEmail === me?.email;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!newEmail) return;
    const res = await request("/email/change", "POST", { newEmail, userId: me?.id });

    if (res) {
      setNewEmail("");
      toast.info("Remember to verify the new email!");
      toast.success("Email changed successfully!");
      dispatch(actions.users.get.me());
    }
  };

  return (
    <PageCard centered>
      <Title style={{ paddingBottom: "1rem" }}>Change email</Title>

      <form onSubmit={onSubmit}>
        <FormWrapper>
          <InputContainer>
            <Label htmlFor="new-email">New email</Label>
            <Input required type="email" id="new-email" onChange={setNewEmail} value={newEmail} />
          </InputContainer>

          <PageButtonContainer>
            <PageButton green disabled={buttonDisabled} type="submit">
              Change email
            </PageButton>
          </PageButtonContainer>
        </FormWrapper>
      </form>
    </PageCard>
  );
};
