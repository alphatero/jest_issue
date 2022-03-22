/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasPassword, Password } from "../../model/login";

type PasswordType = {
  isPass: Number | null;
  isLogin: Number;
};

const password: PasswordType = reactive({
  isPass: null,
  isLogin: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasPassword(msg)) {
    Object.assign(password, Password(msg));
  }
});

export function usePassword() {
  const passwordRef = ref(password);

  watch(
    () => password,
    (passwordValue) => (passwordRef.value = passwordValue)
  );

  return { password: passwordRef };
}

export default password;
