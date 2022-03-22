import { Msg } from "../../types";

export function hasVersion(msg: Msg) {
  return (
    "firmwareVersion" in msg &&
    "softwareVersion" in msg &&
    "controlBoxNumber" in msg &&
    "toolNumber" in msg
  );
}

type Props = {
  firmwareVersion: string;
  softwareVersion: string;
  controlBoxNumber: string;
  toolNumber: string;
};

export function Version({
  firmwareVersion,
  softwareVersion,
  controlBoxNumber,
  toolNumber,
}: Props) {
  return {
    firmware: firmwareVersion,
    software: softwareVersion,
    controller: controlBoxNumber,
    tool: toolNumber,
  };
}
