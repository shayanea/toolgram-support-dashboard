import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

const getAccounts = (array, size, page, search, items) => dispatch => {
  let ids = array.map(e => e.id).join(",");
  return axios
    .get(`/publicprofiles?AccountId=${ids}&AccountId_op=in`)
    .then(res => {
      dispatch({
        type: type.FETCH_CHANNELS,
        payload: {
          isLoading: false,
          items,
          accounts: res.data.data,
          size,
          page,
          search
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_CHANNELS,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          size,
          page,
          search
        }
      });
    });
};

export const getChannels = (size, page, status, search) => dispatch => {
  dispatch({
    type: type.FETCH_CHANNELS,
    payload: {
      isLoading: true,
      items: [],
      accounts: [],
      size,
      page,
      search
    }
  });
  let searchQuery = search !== "" ? `&Name=${search}&Name_op=has` : "";
  axios
    .get(`/channels?_pageSize=10&_pageNumber=${page}&BanStatusId=${status}&BanStatusId_op=in${searchQuery}`)
    .then(res => {
      if (res.data.data.length) {
        let array = [];
        res.data.data.forEach(item => {
          array.push({ id: item.accountId });
        });
        return dispatch(getAccounts(array, (size = res.data.meta.totalCount), page, search, res.data.data));
      }
      dispatch({
        type: type.FETCH_CHANNELS,
        payload: {
          isLoading: true,
          items: [],
          accounts: [],
          size,
          page,
          search
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_CHANNELS,
        payload: {
          isLoading: false,
          items: [],
          accounts: [],
          size,
          page,
          search
        }
      });
    });
};
