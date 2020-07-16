export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  return re.test(String(password));
};

export const generateRandomPassword = () =>
  "Hi1" + Math.random().toString(36).slice(-8);

export const randomString = (
  len,
  baseStr = "123456789abcdefghijklmnopqwersyzw"
) => {
  let ans = "";
  for (let i = len; i > 0; i--) {
    ans += baseStr[Math.floor(Math.random() * baseStr.length)];
  }
  return ans;
};
