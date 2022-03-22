import { Msg } from "../../types";

export function hasOffset(msg: Msg) {
  return "offset" in msg && "unit" in msg && "minSpecTorque";
}

type Props = {
  offset: number;
  unit: number;
  minSpecTorque: number;
};

export function Offset({ offset, unit, minSpecTorque }: Props) {
  function toFormat(val: number) {
    let temp = 0;
    if (val > 32768) {
      temp = 32768 - val;
    } else {
      temp = val;
    }

    let newValue = 0;
    if (unit === 0) {
      if (minSpecTorque >= 100) {
        newValue = Number(temp) - (Number(temp) % 10);
      } else {
        newValue = Number(temp);
      }
    } else if (unit !== 0 && minSpecTorque >= 1000) {
      newValue = Number(temp) - (Number(temp) % 100);
    } else {
      newValue = Number(temp) - (Number(temp) % 10);
    }
    return newValue / 1000;
  }
  return {
    val: toFormat(offset),
  };
}
