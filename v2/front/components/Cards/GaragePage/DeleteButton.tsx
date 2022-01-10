import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../../state/actions";
import { useISelector } from "../../../state/hooks";
import { config } from "../../../util/axios";
import { wait } from "../../../util/wait";
import { PageButton } from "../../Styles/Page-cards";

export const DeleteButton = ({ garage }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

  const dispatch = useDispatch();
  const searchInput = useISelector((state) => state.search.input.value);

  const onBtnClick = async () => {
    if (open) {
      try {
        await axios(config(`/garages/${garage.id}`, "DELETE"));
        toast.success("Garage deleted successfully!");
        dispatch(actions.users.get.me());

        if (searchInput) dispatch(actions.search.search(searchInput));

        await wait(2000);

        if (searchInput) {
          router.push(`/search?q=${searchInput}`, `/search?q=${searchInput}`, { shallow: true });
          return null;
        }

        router.push("/", "/", { shallow: true });
      } catch (err) {
        toast.error("Error deleting garage");
      }

      setOpen(false);
      return clearTimeout(deleteTimer);
    }

    setOpen(!open);

    clearTimeout(deleteTimer);
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);
    setDeleteTimer(timer);
  };

  return (
    <PageButton onClick={() => onBtnClick()} red>
      {open ? "Are you sure?" : "Delete garage"}
    </PageButton>
  );
};
