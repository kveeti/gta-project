import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../state/actions";

export const useGetMe = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.users.get.me());
  }, []);
};
