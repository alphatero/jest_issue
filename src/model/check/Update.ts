import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasUpdate(msg: Msg) {
  return (
    "bootloadOk" in msg ||
    "updateOk" in msg ||
    "progress" in msg ||
    "showFile" in msg
  );
}

type Props = {
  bootloadOk: number;
  updateOk: number;
  progress: number;
  showFile: number | string;
};

export function Update({ bootloadOk, updateOk, progress, showFile }: Props) {
  return {
    bootloadOk: Number(bootloadOk),
    updateOk: Number(updateOk),
    progress: Number(progress),
    showFile: Number(showFile),
  };
}
