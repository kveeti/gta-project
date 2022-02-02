import { useRouter } from "next/router";
import { StyledButton } from "./Styles";
import { request } from "../../../../util/axios";
import { siteBaseUrl } from "../../../../envs";

export const TestButton = () => {
  const router = useRouter();

  const onClick = async () => {
    const rand = Math.random().toString().slice(2, 13);

    const res = await request("/auth/register", "POST", {
      username: `test-account-${rand}`,
      email: `test-account-${rand}@${siteBaseUrl}`,
      password: rand,
      isTestAccount: true,
    });

    if (res) router.push("/", "/", { shallow: true });
  };

  return (
    <StyledButton green form="null" onClick={onClick}>
      Test account
    </StyledButton>
  );
};
