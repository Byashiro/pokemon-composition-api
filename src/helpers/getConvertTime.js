import { DateTime } from "luxon";

export const getConvertTime = () => {
  const date = DateTime.now();
  const format = { hour: "numeric", minute: "numeric", second: "numeric" };
  const dateFormat = date.setLocale("es").toLocaleString(format);
  const [hour, minute, second] = dateFormat.split(':').map(Number);
  const convertTime = ((hour * 60) * 60) + (minute * 60) + second;
  return convertTime;
};