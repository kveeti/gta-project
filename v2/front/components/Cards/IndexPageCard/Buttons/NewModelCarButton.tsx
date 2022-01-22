import { useRouter } from "next/router";
import { ButtonContainer } from "../../../Styles/SinglePage";
import { StyledButton } from "../../Signin/Buttons/Styles";

export const NewModelCarButton = () => {
  const router = useRouter();

  const onClick = async () => {
    router.push("/new/model-car", "/new/model-car", { shallow: true });
  };

  return (
    <ButtonContainer>
      <StyledButton blue onClick={onClick}>
        New model car
      </StyledButton>
    </ButtonContainer>
  );
};
