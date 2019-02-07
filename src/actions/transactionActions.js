import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

const getAccounts = array => {
  let ids = array.map(e => e.id).join(",");
  return axios.get(`/publicprofiles?AccountId=${ids}&AccountId_op=in`);
};

const getProfiles = array => {
  let ids = array.map(e => e.id).join(",");
  return axios.get(`/accounts?AccountId=${ids}&AccountId_op=in`);
};

const getAccountsAndProfiles = (array, size, page, items, actionType) => dispatch => {
  return Promise.all([getAccounts(array), getProfiles(array)])
    .then(res => {
      dispatch({
        type: actionType,
        payload: {
          isLoading: false,
          items,
          accounts: res[0].data.data,
          profiles: res[1].data.data,
          size,
          page
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: actionType,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          profiles: [],
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
      profiles: [],
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
        return dispatch(getAccountsAndProfiles(array, size, page, res.data.data, type.FETCH_TRANSACTIONS));
      }
      dispatch({
        type: type.FETCH_TRANSACTIONS,
        payload: {
          isLoading: true,
          items: [],
          accounts: [],
          profiles: [],
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
          profiles: [],
          size,
          page
        }
      });
    });
};

export const getUserBalances = (size, page) => dispatch => {
  dispatch({
    type: type.FETCH_BALANCES,
    payload: {
      isLoading: true,
      items: [],
      accounts: [],
      profiles: [],
      size,
      page
    }
  });
  axios
    .get(`/accountbalances?_pageSize=${size}&_pageNumber=${page}`)
    .then(res => {
      if (res.data.data.length) {
        let array = [];
        res.data.data.forEach(item => {
          array.push({ id: item.accountId });
        });
        return dispatch(getAccountsAndProfiles(array, size, page, res.data.data, type.FETCH_BALANCES));
      }
      dispatch({
        type: type.FETCH_BALANCES,
        payload: {
          isLoading: true,
          items: [],
          accounts: [],
          profiles: [],
          size,
          page
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_BALANCES,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          profiles: [],
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
