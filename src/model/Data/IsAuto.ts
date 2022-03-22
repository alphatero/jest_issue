import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasAutoSave(msg: Msg) {
  return "isAutoSave" in msg;
}

type Props = {
  isAutoSave: number;
};

export function AutoSave({ isAutoSave }: Props) {
  return {
    val: Number(isAutoSave),
  };
}
