import { Msg } from "../../types";

export function hasSpecTorque(msg: Msg) {
  return "maxSpecTorque" in msg || "minSpecTorque" in msg;
}

type Props = {
  maxSpecTorque: number;
  minSpecTorque: number;
  unit: number;
};

export function SpecTorque({ maxSpecTorque, minSpecTorque, unit }: Props) {
  function toFormat(val: number) {
    let newValue = 0;
    if (unit === 0) {
      if (minSpecTorque >= 100) {
        newValue = Number(val) - (Number(val) % 10);
      } else {
        newValue = Number(val);
      }
    } else if (unit !== 0 && minSpecTorque >= 1000) {
      newValue = Number(val) - (Number(val) % 100);
    } else {
      newValue = Number(val) - (Number(val) % 10);
    }
    return newValue / 1000;
  }
  return {
    max: toFormat(maxSpecTorque),
    min: toFormat(minSpecTorque),
    unit,
    maxUpper: toFormat(maxSpecTorque * 1.1),
  };
}
