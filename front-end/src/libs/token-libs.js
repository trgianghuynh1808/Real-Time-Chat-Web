const TOKEN_NAME = "_real-time-chat";

export const saveToken = (token) =>
  token ? localStorage.setItem(TOKEN_NAME, token) : null;

export const getToken = () => localStorage.getItem(TOKEN_NAME);

export const removeToken = () => localStorage.removeItem(TOKEN_NAME);
