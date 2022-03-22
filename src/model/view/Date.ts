import { Msg } from "../../types";

export function hasDates(msg: Msg) {
  return (
    "year" in msg &&
    "month" in msg &&
    "day" in msg &&
    "hours" in msg &&
    "minutes" in msg &&
    "seconds" in msg
  );
}

type Props = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function Dates({ year, month, day, hours, minutes, seconds }: Props) {
  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
  };
}
