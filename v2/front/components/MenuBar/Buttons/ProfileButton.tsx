import axios from "axios";
import { ExitIcon } from "@radix-ui/react-icons";
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
    await axios(config("/auth/logout", "POST")).catch(() => null);
    toast.success("Logged out!");
    localStorage.clear();
    setAccessToken(null);

    await wait(2000);

    await router.push("/signin", "/signin", { shallow: true });
    dispatch(actions.users.set.me(initState.users.me));
  };

  return (
    <MenubarBtn transparent profile onClick={() => onClick()}>
      <ExitIcon style={{ color: "white", transform: "scale(1.6)" }} />
    </MenubarBtn>
  );
};
