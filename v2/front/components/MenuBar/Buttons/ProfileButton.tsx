import axios from "axios";
import { PersonIcon } from "@radix-ui/react-icons";
import { MenubarBtn } from "./Styles";
import { config } from "../../../util/axios";
import { useRouter } from "next/router";
import { wait } from "../../../util/wait";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { initState } from "../../../state/InitState";
import { actions } from "../../../state/actions";
import { setAccessToken } from "../../../util/accessToken";

export const ProfileButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClick = async () => {
    await axios(config("/auth/logout", "POST")).catch();
    toast.success("Logged out!");

    await wait(2000);

    dispatch(actions.users.set.me(initState.users.me));
    setAccessToken("");

    router.push("/signin", "/signin", { shallow: true });
  };

  return (
    <MenubarBtn transparent profile onClick={() => onClick()}>
      <PersonIcon style={{ color: "white", transform: "scale(1.6)" }} />
    </MenubarBtn>
  );
};
