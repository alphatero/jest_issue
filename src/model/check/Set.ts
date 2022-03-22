import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasSet(msg: Msg) {
  return (
    "setParamOk" in msg ||
    "setMasterOk" in msg ||
    "setMan1Ok" in msg ||
    "setMan2Ok" in msg ||
    "setTimeOk" in msg ||
    "setSystemOk" in msg ||
    "setDeviceOk" in msg ||
    "setIpOk" in msg
  );
}

type Props = {
  setParamOk: number;
  setMasterOk: number;
  setMan1Ok: number;
  setMan2Ok: number;
  setTimeOk: number;
  setSystemOk: number;
  setDeviceOk: number;
  setIpOk: number;
};

export function Set({
  setParamOk,
  setMasterOk,
  setMan1Ok,
  setMan2Ok,
  setTimeOk,
  setSystemOk,
  setDeviceOk,
  setIpOk,
}: Props) {
  return {
    setParamOk: Number(setParamOk),
    setMasterOk: Number(setMasterOk),
    setMan1Ok: Number(setMan1Ok),
    setMan2Ok: Number(setMan2Ok),
    setTimeOk: Number(setTimeOk),
    setSystemOk: Number(setSystemOk),
    setDeviceOk: Number(setDeviceOk),
    setIpOk: Number(setIpOk),
  };
}
