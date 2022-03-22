import { Msg } from "../../types";

export function hasDone(msg: Msg) {
  return "isDone" in msg;
}

type Props = {
  isDone: number;
};

export function Done({ isDone }: Props) {
  return {
    val: Number(isDone),
  };
}
