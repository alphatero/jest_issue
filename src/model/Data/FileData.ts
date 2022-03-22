import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasFileDatas(msg: Msg) {
  return "fileData" in msg;
}

export function hasFileHead(msg: Msg) {
  return "fileHead" in msg;
}
