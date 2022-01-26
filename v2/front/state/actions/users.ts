import { request } from "../../util/axios";
import { constants } from "../actionTypes";

export const get = {
  me: () => async (dispatch: any) => {
    dispatch(api.setLoading(true));
    const res = await request(`/users/me`, "GET");
    dispatch(api.setLoading(false));

    if (res) {
      dispatch(set.me(res.data));
    } else {
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
