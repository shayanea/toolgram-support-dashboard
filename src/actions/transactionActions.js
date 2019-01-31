import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

const getAccounts = (array, size, page, items) => dispatch => {
  let ids = array.map(e => e.id).join(",");
  return axios
    .get(`/publicprofiles?AccountId=${ids}&AccountId_op=in`)
    .then(res => {
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: false,
          items,
          accounts: res.data.data,
          size,
          page
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          size,
          page
        }
      });
    });
};

export const getTransaction = (size, page) => dispatch => {
  dispatch({
    type: type.FETCH_TRANSACTIONS,
    payload: {
      isLoading: true,
      items: [],
      accounts: [],
      size,
      page
    }
  });
  axios
    .get(`/transactions?_pageSize=${size}&_pageNumber=${page}&typeFlags=1&typeFlags_op=mask`)
    .then(res => {
      if (res.data.data.length) {
        let array = [];
        res.data.data.forEach(item => {
          array.push({ id: item.accountId });
        });
        return dispatch(getAccounts(array, size, page, res.data.data));
      }
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: true,
          items: [],
          accounts: [],
          size,
          page
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          size,
          page
        }
      });
    });
};

const getBankAccounts = (array, size, page, items) => dispatch => {
  let ids = array.map(e => e.id).join(",");
  return axios
    .get(`bankaccounts?AccountId=${ids}`)
    .then(res => {
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: true,
          items,
          accounts: res.data.data,
          size,
          page
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          size,
          page
        }
      });
    });
};

export const getWithdrawal = (size, page) => dispatch => {
  dispatch({
    type: type.FETCH_TRANSACTIONS,
    payload: {
      isLoading: true,
      items: [],
      accounts: [],
      size,
      page
    }
  });
  axios
    .get(`/withdrawals?_pageSize=${size}&_pageNumber=${page}&_sort=-requestDateTime`)
    .then(res => {
      if (res.data.data.length) {
        let array = [];
        res.data.data.forEach(item => {
          array.push({ id: item.accountId });
        });
        return dispatch(getBankAccounts(array, size, page, res.data.data));
      }
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: true,
          items: [],
          accounts: [],
          size,
          page
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          size,
          page
        }
      });
    });
};

export const clearState = () => dispatch => {
  dispatch({
    type: type.CLEAR_TRANSACTIONS,
    payload: {
      isLoading: false,
      items: [],
      accounts: [],
      size: 10,
      page: 1
    }
  });
};
