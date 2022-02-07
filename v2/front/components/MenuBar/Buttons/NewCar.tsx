import { useRouter } from "next/router";
import { StyledTooltip } from "../../Cards/Tooltip/Tooltip";
import { NewCarIcon } from "../../Icons/NewCarIcon";
import { MenubarBtn } from "./Styles";

export const NewCarButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/car", "/new/car", { shallow: true });
  };

  return (
    <StyledTooltip content="New car">
      <MenubarBtn transparent onClick={() => onClick()}>
        <NewCarIcon color={"white"} height={22} iconStyle={{ paddingTop: "4px" }} />
      </MenubarBtn>
    </StyledTooltip>
  );
};
