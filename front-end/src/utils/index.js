import { get } from "lodash/fp";

import RESP_CODE from "constants/resp-code";

export const formatAMPM = () => {
  var d = new Date(),
    months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    days = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  return (
    days[d.getDay()] +
    ", " +
    d.getDate() +
    "/" +
    months[d.getMonth()] +
    "/" +
    d.getFullYear()
  );
};

export const getMsgByRespCode = code => {
  return get(code, RESP_CODE);
};

export const doFunctionWithEnter = (event, func) =>
  typeof event === "object" &&
  event.key === "Enter" &&
  typeof func === "function" &&
  func();

export const convertStrToTime = dateStr => {
  const date = new Date(dateStr);

  let hour = date.getHours() + "";
  let minutes = date.getMinutes() + "";

  hour = checkZero(hour);
  minutes = checkZero(minutes);

  return `${hour}:${minutes}`;
};

const checkZero = str => {
  if (str.length === 1) {
    str = "0" + str;
  }
  return str;
};
