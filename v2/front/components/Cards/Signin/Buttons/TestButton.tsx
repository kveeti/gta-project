import axios from "axios";
import { useRouter } from "next/router";
import { StyledButton } from "./Styles";
import { config } from "../../../../util/axios";
import { toast } from "react-toastify";
import { siteBaseUrl } from "../../../../envs";

export const TestButton = () => {
  const router = useRouter();

  const onClick = async () => {
    try {
      const rand = Math.random().toString().slice(2, 13);

      const res = await axios(
        config("/auth/register", "POST", {
          username: `test-account-${rand}`,
          email: `test-account-${rand}@${siteBaseUrl}`,
          password: rand,
        })
      );

      if (res?.status === 204) router.push("/", "/", { shallow: true });
    } catch {
      toast.error("Error creating a test account, please try again later");
    }
  };

  return (
    <StyledButton green onClick={onClick}>
      Test account
    </StyledButton>
  );
};
