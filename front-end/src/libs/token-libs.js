const TOKEN_NAME = "_real-time-chat";
const REFRESH_TOKEN_NAME = "_refresh_real-time-chat";

export const saveToken = (token) =>
  token ? localStorage.setItem(TOKEN_NAME, token) : null;

export const saveRefreshToken = (token) =>
  token ? localStorage.setItem(REFRESH_TOKEN_NAME, token) : null;

export const getToken = () => localStorage.getItem(TOKEN_NAME);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_NAME);

export const removeToken = () => {
  localStorage.removeItem(TOKEN_NAME);
  localStorage.removeItem(REFRESH_TOKEN_NAME);
};
