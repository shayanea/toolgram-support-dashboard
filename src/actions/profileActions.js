import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

export const getProfile = data => dispatch => {
  dispatch({
    type: type.FETCH_PROFILE,
    payload: {
      isLoading: true,
      data: null
    }
  });
  let userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
  axios
    .get(`/accounts/${userInfo.accountId}/profile`)
    .then(res => {
      dispatch({
        type: type.FETCH_PROFILE,
        payload: {
          isLoading: false,
          data: res.data.data
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_PROFILE,
        payload: {
          isLoading: false,
          data: null
        }
      });
    });
};
