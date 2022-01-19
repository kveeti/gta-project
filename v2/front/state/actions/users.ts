import axios from "axios";
import { config } from "../../util/axios";
import { constants } from "../actionTypes";

export const get = {
  me: () => async (dispatch: any) => {
    try {
      dispatch(api.setLoading(true));
      const res = await axios(config("/users/me", "GET"));
      dispatch(api.setLoading(false));

      if (!res?.data) return;
      dispatch(set.me(res.data));
    } catch {
      dispatch(api.setLoading(false));
      dispatch(api.setError(true));
    }
  },
};

export const set = {
  me: (payload: any) => {
    return {
      type: constants.users.SET_ME,
      payload: payload,
    };
  },
};

export const api = {
  setLoading: (loading: boolean) => {
    return {
      type: constants.users.api.SET_LOADING,
      payload: loading,
    };
  },

  setError: (loading: boolean) => {
    return {
      type: constants.users.api.SET_ERROR,
      payload: loading,
    };
  },
};
