import { useRouter } from "next/router";
import { StyledTooltip } from "../../Cards/Tooltip/Tooltip";
import { NewCarIcon } from "../../Icons/NewCarIcon";
import { MenubarBtn } from "./Styles";

export const NewCarButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/new/cars", "/new/cars");
  };

  return (
    <StyledTooltip content="New cars">
      <MenubarBtn transparent onClick={onClick}>
        <NewCarIcon color={"white"} height={22} iconStyle={{ paddingTop: "4px" }} />
      </MenubarBtn>
    </StyledTooltip>
  );
};
