import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasDownload(msg: Msg) {
  return "isDownload" in msg || "fileName" in msg;
}

type Props = {
  fileName: string | number;
  isDownload: number;
};

export function Download({ fileName, isDownload }: Props) {
  return {
    fileName,
    status: Number(isDownload),
  };
}
