import { useRouter } from "next/router";
import { StyledTooltip } from "../../Cards/Tooltip/Tooltip";
import { NewGarageIcon } from "../../Icons/NewGarageIcon";
import { MenubarBtn } from "./Styles";

export const NewGarageButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/garage", "/new/garage");
  };

  return (
    <StyledTooltip content="New garage">
      <MenubarBtn transparent onClick={() => onClick()}>
        <NewGarageIcon color={"white"} height={25} />
      </MenubarBtn>
    </StyledTooltip>
  );
};
