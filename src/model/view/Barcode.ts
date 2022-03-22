/* eslint-disable no-bitwise */
import { Msg } from "../../types";

export function hasBarcode(msg: Msg) {
  return "barcode" in msg;
}

type Props = {
  barcode: string;
};

export function Barcode({ barcode }: Props) {
  return {
    val: barcode,
  };
}
