import { Msg } from "../../types";

export function hasTorque(msg: Msg) {
  return (
    "maxTorque" in msg &&
    "minTorque" in msg &&
    "tarTorque" in msg &&
    "unit" in msg
  );
}

type Props = {
  maxTorque: number;
  minTorque: number;
  tarTorque: number;
  unit: number;
  minSpecTorque: number;
};

export function Torque({
  maxTorque,
  minTorque,
  tarTorque,
  unit,
  minSpecTorque,
}: Props) {
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

  let precision = 0;
  let step = 0;

  if (unit === 0) {
    if (minSpecTorque >= 100) {
      precision = 2;
      step = 0.01;
    } else {
      precision = 3;
      step = 0.001;
    }
  } else if (unit !== 0 && minSpecTorque >= 1000) {
    precision = 1;
    step = 0.1;
  } else {
    precision = 2;
    step = 0.02;
  }

  return {
    target: toFormat(tarTorque),
    max: toFormat(maxTorque),
    min: toFormat(minTorque),
    unit,
    precision,
    step,
  };
}
