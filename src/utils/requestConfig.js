import axios from "axios";
import store from "../store";
import { LOGOUT } from "../actions/type";
import { history } from "./history";

var axiosInstance = axios.create({
  baseURL: "https://betaapi.toolgram.app"
});

axiosInstance.interceptors.request.use(config => {
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
  config.headers.Authorization = userInfo ? `bearer ${userInfo.token}` : "";
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch({
        type: LOGOUT,
        payload: {
          isAuthenticated: false
        }
      });
      return history.push(`/login`);
    }
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
