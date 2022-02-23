import { UpdateIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { actions } from "../../../../../state/actions";
import { useISelector } from "../../../../../state/hooks";
import { FloatingButton } from "../Styles";

export const ShowCheckedButton = () => {
  const dispatch = useDispatch();
  const show = useISelector((state) => state.checked.show);

  return (
    <FloatingButton
      blue
      style={{ marginTop: "1rem" }}
      onClick={() => dispatch(actions.checked.setShow(!show))}
    >
      <UpdateIcon />
    </FloatingButton>
  );
};
