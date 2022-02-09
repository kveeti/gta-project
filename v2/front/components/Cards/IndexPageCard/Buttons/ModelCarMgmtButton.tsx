import { useRouter } from "next/router";
import { FullWidthButton } from "../../../Styles/Buttons";

export const ModelCarMgmtButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/management/model-cars", "/management/model-cars");
  };

  return (
    <FullWidthButton blue onClick={onClick}>
      Manage model cars
    </FullWidthButton>
  );
};
