import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasFileList(msg: Msg) {
  return "fileList" in msg;
}

type Props = {
  fileList: string[];
};

export function FileList({ fileList }: Props) {
  return {
    list: fileList,
  };
}
