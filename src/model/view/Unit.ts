import { Msg } from "../../types";

export function hasUnit(msg: Msg) {
  return "unit" in msg;
}

type Props = {
  unit: string;
};

export function Unit({ unit }: Props) {
  if (unit === "Nm" || Number(unit) === 0) {
    return {
      value: 0,
      name: "Nm",
    };
  }
  if (unit === "kgf-cm" || Number(unit) === 1) {
    return {
      value: 1,
      name: "kgf-cm",
    };
  }
  return {
    value: 2,
    name: "lb-in",
  };
}
