import { Msg } from "../../types";

export function hasSpeed(msg: Msg) {
  return "speed" in msg;
}

type Props = {
  speed: number;
};

export function Speed({ speed }: Props) {
  return {
    val: Number(speed),
  };
}
