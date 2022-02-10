import { useRouter } from "next/router";
import { FullWidthButton } from "../../../Styles/Buttons";

export const DeleteAccountButton = () => {
  const router = useRouter();

  return (
    <FullWidthButton
      red
      onClick={() => {
        router.push("/me/delete", "/me/delete");
      }}
    >
      Delete account
    </FullWidthButton>
  );
};
