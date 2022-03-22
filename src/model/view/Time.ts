import { Msg } from "../../types";

export function hasTime(msg: Msg) {
  return "maxTime" in msg;
}

type Props = {
  maxTime: number;
  minTime: number;
  tarTime: number;
};

export function Time({ maxTime, minTime, tarTime }: Props) {
  return {
    target: Number(tarTime) / 100,
    max: Number(maxTime) / 100,
    min: Number(minTime) / 100,
  };
}
