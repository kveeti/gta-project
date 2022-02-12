import { toast } from "react-toastify";
import { useISelector } from "../../../../state/hooks";
import { request } from "../../../../util/axios";
import { msgs, paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Styles/Buttons";

export const ResendEmailButton = () => {
  const me = useISelector((state) => state.users.me);

  const onClick = async () => {
    if (!me.id) return;

    const res = await request(paths.resendEmail(), "POST", {
      userId: me.id,
    });

    if (res) toast.success(msgs.success.emailResent);
  };

  return (
    <FullWidthButton green onClick={onClick}>
      Resend verification email
    </FullWidthButton>
  );
};
