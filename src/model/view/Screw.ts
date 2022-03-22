import { Msg } from "../../types";

export function hasScrew(msg: Msg) {
  return "totalScrew" in msg;
}

type Props = {
  curScrew: number;
  totalScrew: number;
  countLock: number;
};

export function Screw({ curScrew, totalScrew, countLock }: Props) {
  return {
    current: Number(curScrew) || 0,
    total: Number(totalScrew),
    countLock: Number(countLock),
  };
}
