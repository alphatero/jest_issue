import { Msg } from "../../types";

export function hasLanguage(msg: Msg) {
  return "language" in msg;
}

type Props = {
  language: number | null;
};

export function Language({ language }: Props) {
  return {
    val: Number(language) || null,
  };
}
