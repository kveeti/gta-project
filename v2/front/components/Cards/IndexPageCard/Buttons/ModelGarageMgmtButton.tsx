import { useRouter } from "next/router";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Styles/Buttons";

export const ModelGarageMgmtButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push(paths.mgmtModelGarageIndex());
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Manage model garages
    </FullWidthButton>
  );
};
