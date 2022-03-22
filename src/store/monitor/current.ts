/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasCurrent, Current } from "../../model/view";

const current = reactive({
  torque: 0,
  turns: 0,
  time: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasCurrent(msg)) {
    Object.assign(current, Current(msg));
  }
});

export function useCurrent() {
  const currentRef = ref(current);

  watch(
    () => current,
    (currentValue) => (currentRef.value = currentValue)
  );

  return { current: currentRef };
}

export default current;
