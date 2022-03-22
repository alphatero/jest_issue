import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasCorrection(msg: Msg) {
  return "slope" in msg && "intercept" in msg;
}

type Props = {
  slope: number;
  intercept: number;
};

export function Correction({ slope, intercept }: Props) {
  return {
    slope: Number(slope) / 100,
    intercept: Number(intercept) / 100,
  };
}
