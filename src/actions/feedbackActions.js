import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

const getAccounts = (array, size, page, status, items) => dispatch => {
  let ids = array.map(e => e.id).join(",");
  return axios
    .get(`/publicprofiles?AccountId=${ids}&AccountId_op=in`)
    .then(res => {
      dispatch({
        type: type.FETCH_FEEDBACKS,
        payload: {
          isLoading: false,
          items,
          accounts: res.data.data,
          size,
          page,
          status
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
          accounts: [],
          size,
          page,
          status
        }
      });
    });
};

export const getFeedbacks = (size, page, status) => dispatch => {
  let statusQuery = "";
  if (status !== 0) {
    statusQuery = `&TypeId=${status}&TypeId_op=In`;
  }
  dispatch({
    type: type.FETCH_FEEDBACKS,
    payload: {
      isLoading: true,
      items: [],
      accounts: [],
      size,
      page,
      status
    }
  });
  axios
    .get(`/feedbacks?_pageSize=${size}&_pageNumber=${page}&_sort=-creationDateTime${statusQuery}`)
    .then(res => {
      let result = [];
      res.data.data.forEach(item => {
        result.push({ id: item.accountId });
      });
      dispatch(getAccounts(result, size, page, status, res.data.data));
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_FEEDBACKS,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          size,
          page,
          status
        }
      });
    });
};
