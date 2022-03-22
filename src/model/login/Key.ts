import { Msg } from "../../types";

export function hasKey(msg: Msg) {
  return "key" in msg;
}

type Props = {
  key: number;
};

export function Key({ key }: Props) {
  return {
    val: key,
  };
}
