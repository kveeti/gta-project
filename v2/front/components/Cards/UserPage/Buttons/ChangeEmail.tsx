import { useRouter } from "next/router";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Common/Buttons";

export const ChangeEmailButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push(paths.changeEmail());
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Change email
    </FullWidthButton>
  );
};
