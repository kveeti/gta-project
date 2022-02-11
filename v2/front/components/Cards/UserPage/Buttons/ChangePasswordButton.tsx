import { useRouter } from "next/router";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Styles/Buttons";

export const ChangePasswordButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push(paths.changePassword());
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Change password
    </FullWidthButton>
  );
};
