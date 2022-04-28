const TOKEN_NAME = "token";

export const getAuthToken = () => {
  return window.localStorage.getItem(TOKEN_NAME);
};

export const setAuthToken = value => {
  window.localStorage.setItem(TOKEN_NAME, value);
};
