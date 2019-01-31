import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

export const getUsers = (size, page) => dispatch => {
  dispatch({
    type: type.FETCH_USERS,
    payload: {
      isLoading: true,
      items: [],
      size,
      page
    }
  });
  axios
    .get(`/accounts?_pageSize=${size}&_pageNumber=${page}`)
    .then(res => {
      dispatch({
        type: type.FETCH_USERS,
        payload: {
          isLoading: false,
          items: res.data.data,
          size,
          page
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_USERS,
        payload: {
          isLoading: false,
          items: [],
          size,
          page
        }
      });
    });
};
