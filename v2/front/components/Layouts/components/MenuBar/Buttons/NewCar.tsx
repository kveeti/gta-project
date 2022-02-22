import { useRouter } from "next/router";
import { paths } from "../../../../../util/constants";
import { StyledTooltip } from "../../../../Common/Tooltip/Tooltip";
import { NewCarIcon } from "../../../../Common/Icons/NewCarIcon";
import { MenubarBtn } from "../Styles";

export const NewCarButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push(paths.newCar());
  };

  return (
    <StyledTooltip content="New cars">
      <MenubarBtn transparent onClick={onClick}>
        <NewCarIcon color={"white"} height={22} iconStyle={{ paddingTop: "4px" }} />
      </MenubarBtn>
    </StyledTooltip>
  );
};
