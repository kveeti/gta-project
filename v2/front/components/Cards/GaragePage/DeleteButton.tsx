import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { request } from "../../../util/axios";
import { paths, msgs } from "../../../util/constants";
import { wait } from "../../../util/wait";
import { PageButton } from "../../Common/Buttons";

export const DeleteButton = ({ garage }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();
  const searchInput = useISelector((state) => state.search.input.value);

  const onBtnClick = async () => {
    if (!open) {
      setOpen(!open);
      if (deleteTimer) clearTimeout(deleteTimer);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 2000);
      setDeleteTimer(timer);
    }

    if (open) {
      const res = await request(`/garages/${garage.id}`, "DELETE");

      if (res) {
        toast.success(msgs.success.garageDeleted);
        dispatch(actions.users.get.me());

        if (searchInput) dispatch(actions.search.search(searchInput));
      }

      await wait(2000);

      if (searchInput) return router.push(`/search?q=${searchInput}`, `/search?q=${searchInput}`);

      router.push(paths.home());

      setOpen(false);
      if (deleteTimer) clearTimeout(deleteTimer);
      return;
    }
  };

  return (
    <PageButton onClick={() => onBtnClick()} red>
      {open ? "Are you sure?" : "Delete garage"}
    </PageButton>
  );
};
