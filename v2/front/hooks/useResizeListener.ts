import { actions } from "../state/actions";
import { useEffect } from "react";
import { useISelector } from "../state/hooks";
import { useDispatch } from "react-redux";

export const useResizeListener = () => {
  const dispatch = useDispatch();
  const state = useISelector((state) => state);

  const setBp = () => {
    let bp = 3;

    if (window.innerWidth < 1060) bp = 2;
    if (window.innerWidth < 690) bp = 1;

    if (state.bp !== bp) dispatch(actions.bp.set(bp));
  };

  useEffect(() => {
    setBp();

    window.addEventListener("resize", setBp);

    return () => window.removeEventListener("resize", setBp);
  }, [state.bp]);
};
