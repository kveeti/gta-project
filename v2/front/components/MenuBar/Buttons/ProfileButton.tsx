import { PersonIcon } from "@radix-ui/react-icons";
import { MenubarBtn } from "./Styles";
import { useRouter } from "next/router";
import { StyledTooltip } from "../../Cards/Tooltip/Tooltip";
import { paths } from "../../../util/constants";

interface Props {
  style?: any;
}

export const ProfileButton = ({ style }: Props) => {
  const router = useRouter();

  const onClick = async () => {
    await router.push(paths.profile());
  };

  return (
    <StyledTooltip content="Profile">
      <MenubarBtn transparent profile onClick={() => onClick()} style={style}>
        <PersonIcon style={{ color: "white", transform: "scale(1.6)" }} />
      </MenubarBtn>
    </StyledTooltip>
  );
};
