import router from "../../router/index";
import { Msg } from "../../types";
/* eslint-disable no-bitwise */
export function hasPassword(msg: Msg) {
  return "isPassword" in msg;
}

type Props = {
  isPassword: number;
};

export function Password({ isPassword }: Props) {
  const path = sessionStorage.getItem("toPath") || "";

  const isPass = Number(isPassword);

  let noPass = 0;

  if (isPass === 0 || isPass === 7 || isPass === 4 || isPass === 5) {
    return {
      isPass,
    };
  }
  sessionStorage.setItem("isLogin", JSON.stringify(isPass));

  if (isPass === 1) {
    router.push(path).catch();
  } else if (isPass === 2 || isPass === 3) {
    console.log(path);
    noPass = 2;
    if (path === "/parameter" || path === "/correction/step1") {
      router.push(path).catch();
    }
  }
  return {
    isLogin: isPass,
    isPass: noPass,
  };
}
