import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

const getAccounts = array => {
  let ids = array.map(e => e.id).join(",");
  return axios.get(`/publicprofiles?AccountId=${ids}&AccountId_op=in`);
};

const getChannels = array => {
  let ids = array.map(e => e.id).join(",");
  return axios.get(`/channels?id=${ids}&Id_op=in`);
};

const getChannelsAndAccounts = (array, array1, size, page, status, items) => dispatch => {
  return Promise.all([getChannels(array), getAccounts(array1)])
    .then(res => {
      dispatch({
        type: type.FETCH_POSTS,
        payload: {
          isLoading: false,
          items,
          channels: res[0].data.data,
          accounts: res[1].data.data,
          size,
          page,
          status
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_POSTS,
        payload: {
          isLoading: false,
          items: [],
          channels: [],
          accounts: [],
          size,
          page,
          status
        }
      });
    });
};

export const getPosts = (size, page, status) => dispatch => {
  let statusQuery = "";
  if (status === "1") {
    statusQuery = "&stateId=3";
  } else if (status === "2") {
    statusQuery = "&stateId=1&scheduleTypeId=2";
  } else if (status === "3") {
    statusQuery = "&stateId=1&scheduleTypeId=3";
  }
  dispatch({
    type: type.FETCH_POSTS,
    payload: {
      isLoading: true,
      items: [],
      channels: [],
      accounts: [],
      size,
      page,
      status
    }
  });
  axios
    .get(`/posts/list?_pageSize=${size}&_pageNumber=${page}&IsArchived=false&_sort=-id${statusQuery}`)
    .then(res => {
      if (res.data.data.length) {
        let array = [],
          array1 = [];
        res.data.data.forEach(item => {
          array.push({ id: item.channelId });
        });
        res.data.data.forEach(item => {
          array1.push({ id: item.accountId });
        });
        return dispatch(getChannelsAndAccounts(array, array1, size, page, status, res.data.data));
      }
      dispatch({
        type: type.FETCH_POSTS,
        payload: {
          isLoading: true,
          items: [],
          channels: [],
          accounts: [],
          size,
          page,
          status
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      dispatch({
        type: type.FETCH_POSTS,
        payload: {
          isLoading: false,
          items: [],
          channels: [],
          accounts: [],
          size,
          page,
          status
        }
      });
    });
};
