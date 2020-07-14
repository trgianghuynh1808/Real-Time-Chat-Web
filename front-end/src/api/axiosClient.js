import axios from "axios";
import queryString from "query-string";

import { getToken } from "libs/token-libs";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = getToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    console.log("test resp", response);

    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    console.log("test error", error.response);
    throw error;
  }
);
export default axiosClient;
