import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasLockRule(msg: Msg) {
  return "ngLock" in msg;
}

type Props = {
  ngLock: number;
  overMaxTorque: number;
  overMinTorque: number;
  overMaxTime: number;
  overMinTime: number;
  overMaxTurns: number;
  overMinTurns: number;
  lockSelect: number;
  judgeSelect: number;
  reduceRpm: number;
};

export function LockRule({
  ngLock,
  overMaxTorque,
  overMinTorque,
  overMaxTime,
  overMinTime,
  overMaxTurns,
  overMinTurns,
  lockSelect,
  judgeSelect,
  reduceRpm,
}: Props) {
  return {
    ngLock: Number(ngLock),
    overMaxTorque: Number(overMaxTorque),
    overMinTorque: Number(overMinTorque),
    overMaxTime: Number(overMaxTime),
    overMinTime: Number(overMinTime),
    overMaxTurns: Number(overMaxTurns),
    overMinTurns: Number(overMinTurns),
    lockSelect,
    judgeSelect: Number(judgeSelect),
    reduceRpm: Number(reduceRpm),
  };
}
