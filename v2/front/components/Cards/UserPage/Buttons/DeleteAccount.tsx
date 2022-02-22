import { useRouter } from "next/router";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Common/Buttons";

export const DeleteAccountButton = () => {
  const router = useRouter();

  return (
    <FullWidthButton
      red
      onClick={() => {
        router.push(paths.deleteAccount());
      }}
    >
      Delete account
    </FullWidthButton>
  );
};
