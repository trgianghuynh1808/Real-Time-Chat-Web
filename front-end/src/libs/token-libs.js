const TOKEN_NAME = "_real-time-chat";

export const saveToken = (token, name = TOKEN_NAME) =>
  token ? localStorage.setItem(name, token) : null;

export const getToken = (name = TOKEN_NAME) => localStorage.getItem(name);

export const removeToken = () => localStorage.removeItem(TOKEN_NAME);
