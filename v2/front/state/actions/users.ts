import axios from "axios";
import { constants } from "../actionTypes";
import { getNextAxiosConfig } from "./axiosConfig";

export const get = {
  me: () => async (dispatch: any) => {
    try {
      dispatch(api.setLoading(true));
      const res = await axios(getNextAxiosConfig("/users", "GET"));
      dispatch(api.setLoading(false));

      dispatch(set.me(res.data));
    } catch {
      dispatch(api.setLoading(false));
      dispatch(api.setError(true));

      console.log("couldnt get me");
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
