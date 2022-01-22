import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ButtonContainer } from "../../../Styles/SinglePage";
import { StyledButton } from "../../Signin/Buttons/Styles";
import { config } from "../../../../util/axios";
import { actions } from "../../../../state/actions";
import { initState } from "../../../../state/InitState";
import { setAccessToken } from "../../../../util/accessToken";

export const NewModelGarageButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = async () => {};

  return (
    <ButtonContainer>
      <StyledButton blue onClick={onClick}>
        New model garage
      </StyledButton>
    </ButtonContainer>
  );
};
