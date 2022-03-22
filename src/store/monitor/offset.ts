/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasOffset, Offset } from "../../model/view";

const offset = reactive({
  val: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasOffset(msg)) {
    Object.assign(offset, Offset(msg));
  }
});

export function useOffset() {
  const offsetRef = ref(offset);

  watch(
    () => offset,
    (offsetValue) => (offsetRef.value = offsetValue)
  );

  return { offset: offsetRef };
}

export default offset;
