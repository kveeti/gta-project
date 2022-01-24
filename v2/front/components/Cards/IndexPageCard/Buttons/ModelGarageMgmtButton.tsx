import { useRouter } from "next/router";
import { FullWidthButton } from "../../../Styles/Buttons";

export const ModelGarageMgmtButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/management/model-garages", "/management/model-garages", { shallow: true });
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Manage model garages
    </FullWidthButton>
  );
};
