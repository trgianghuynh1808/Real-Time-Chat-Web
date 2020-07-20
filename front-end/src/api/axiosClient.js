import axios from "axios";
import queryString from "query-string";
import { get } from "lodash/fp";

import { getToken, getRefreshToken, saveToken } from "libs/token-libs";
import { showErrorToast, showSuccessToast } from "libs/toast-libs";
import { getMsgByRespCode } from "utils";

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
    if (response && response.data) {
      const message = getMsgByRespCode(response.data.message);
      showSuccessToast(message);

      return response.data;
    }
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    const originalRequest = error.config;

    //handle refresh token
    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const resp = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/refresh-token`,
        { refreshToken: getRefreshToken() }
      );

      const token = get("data.token", resp.data);
      saveToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axiosClient(originalRequest);
    }

    if (data) {
      const { message } = data;
      showErrorToast(getMsgByRespCode(message));
    }

    throw error;
  }
);
export default axiosClient;
