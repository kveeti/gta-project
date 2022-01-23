import { useRouter } from "next/router";
import { ButtonContainer } from "../../../Styles/SinglePage";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const NewModelGarageButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/new/model-garage", "/new/model-garage", { shallow: true });
  };

  return (
    <ButtonContainer>
      <StyledButton blue onClick={onClick}>
        New model garage
      </StyledButton>
    </ButtonContainer>
  );
};
