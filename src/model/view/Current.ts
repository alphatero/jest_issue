import { Msg } from "../../types";

export function hasCurrent(msg: Msg) {
  return "curTime" in msg && "curTurns" in msg && "curTorque" in msg;
}

type Props = {
  curTorque: number;
  curTurns: number;
  curTime: number;
  unit: number;
  minSpecTorque: number;
};

export function Current({
  curTorque,
  curTurns,
  curTime,
  unit,
  minSpecTorque,
}: Props) {
  let newValue = 0;
  if (unit === 0) {
    if (minSpecTorque >= 100) {
      newValue = Number(curTorque) - (Number(curTorque) % 10);
    } else {
      newValue = Number(curTorque);
    }
  } else if (unit !== 0 && minSpecTorque >= 1000) {
    newValue = Number(curTorque) - (Number(curTorque) % 100);
  } else {
    newValue = Number(curTorque) - (Number(curTorque) % 10);
  }
  return {
    torque: newValue / 1000,
    turns: Number(curTurns) / 10,
    time: Number(curTime) / 100,
  };
}
