import { Msg } from "../../types";

export function hasMinVoltage(msg: Msg) {
  return "minTorqueVoltage" in msg || "totalPointNum" in msg;
}

type Props = {
  minTorqueVoltage: number;
  unit: number;
  minSpecTorque: number;
  totalPointNum: number;
};

export function MinVoltage({
  minTorqueVoltage,
  unit,
  minSpecTorque,
  totalPointNum,
}: Props) {
  let toPersion = 0;
  if (unit === 0) {
    console.log(minSpecTorque);
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
    minTorqueVoltage: Number(minTorqueVoltage) / 100,
    precision: Number(toPersion),
    totalPoint: Number(totalPointNum),
  };
}
