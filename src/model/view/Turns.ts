import { Msg } from "../../types";

export function hasTurns(msg: Msg) {
  return "maxTurns" in msg && "minTurns" in msg && "tarTurns" in msg;
}

type Props = {
  maxTurns: number;
  minTurns: number;
  tarTurns: number;
};

export function Turns({ maxTurns, minTurns, tarTurns }: Props) {
  return {
    target: Number(tarTurns) / 10,
    max: Number(maxTurns) / 10,
    min: Number(minTurns) / 10,
  };
}
