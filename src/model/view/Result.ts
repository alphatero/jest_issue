import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasResult(msg: Msg) {
  return "result" in msg && "errorCode" in msg;
}

type Props = {
  result: number;
  errorCode: number | string;
};

export function Result({ result, errorCode }: Props) {
  return {
    result: Number(result),
    firstError: Number(errorCode) & 0x03,
    secondError: Number(errorCode) & 0x3c,
  };
}
