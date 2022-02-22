import { useRouter } from "next/router";
import { paths } from "../../../../util/constants";
import { FullWidthButton } from "../../../Common/Buttons";

export const ModelCarMgmtButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push(paths.mgmtModelCarIndex());
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Manage model cars
    </FullWidthButton>
  );
};
