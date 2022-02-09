import { useRouter } from "next/router";
import { MenubarBtn } from "./Styles";
import { StyledTooltip } from "../../Cards/Tooltip/Tooltip";

export const HomeButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/", "/");
  };

  return (
    <StyledTooltip content="Home">
      <MenubarBtn transparent home onClick={() => onClick()}>
        <img src="/icons/home-icon.png" alt="home icon" height={25} />
      </MenubarBtn>
    </StyledTooltip>
  );
};
