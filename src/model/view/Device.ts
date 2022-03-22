import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasDevice(msg: Msg) {
  return "device" in msg;
}

type Props = {
  device: number;
};

export function Device({ device }: Props) {
  return {
    number: Number(device),
  };
}
