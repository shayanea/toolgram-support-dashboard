import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

export const getFeedbacks = (size, page, status) => dispatch => {
  dispatch({
    type: type.FETCH_FEEDBACKS,
    payload: {
      isLoading: true,
      items: [],
      size,
      page
    }
  });
  axios
    .get(`/feedbacks?_pageSize=${size}&_pageNumber=${page}&typeId=${status}`)
    .then(res => {
      dispatch({
        type: type.FETCH_FEEDBACKS,
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
        type: type.FETCH_FEEDBACKS,
        payload: {
          isLoading: false,
          items: [],
          size,
          page
        }
      });
    });
};
