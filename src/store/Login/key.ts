/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasKey, Key } from "../../model/login";

const key = reactive({
  val: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasKey(msg)) {
    Object.assign(key, Key(msg));
  }
});

export function useKey() {
  const keyRef = ref(key);

  watch(
    () => key,
    (keyValue) => (keyRef.value = keyValue)
  );

  return { key: keyRef };
}

export default key;
