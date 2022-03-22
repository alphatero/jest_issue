import { Msg } from "../../types";

export function hasMaxVoltage(msg: Msg) {
  return "maxTorqueVoltage" in msg || "totalPointNum" in msg || "curPointNum";
}

type Props = {
  maxTorqueVoltage: number;
  unit: number;
  minSpecTorque: number;
  totalPointNum: number;
  curPointNum: number;
};

export function MaxVoltage({
  maxTorqueVoltage,
  unit,
  minSpecTorque,
  totalPointNum,
  curPointNum,
}: Props) {
  let toPersion = 0;
  if (unit === 0) {
    if (minSpecTorque >= 100) {
      toPersion = 2;
    } else {
      toPersion = 3;
    }
  } else if (minSpecTorque >= 1000) {
    toPersion = 2;
  } else {
    toPersion = 3;
  }

  return {
    maxTorqueVoltage: Number(maxTorqueVoltage) / 100,
    precision: Number(toPersion),
    totalPoint: Number(totalPointNum),
    curPoint: Number(curPointNum),
  };
}
