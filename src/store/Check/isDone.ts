/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasDone, Done } from "../../model/check";

const isDone = reactive({
  val: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasDone(msg)) {
    Object.assign(isDone, Done(msg));
  }
});

export function useDone() {
  const isDoneRef = ref(isDone);

  watch(
    () => isDone,
    (isDoneValue) => (isDoneRef.value = isDoneValue)
  );

  return { isDone: isDoneRef };
}

export default isDone;
