/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasResult, Result } from "../../model/view";

const result = reactive({
  result: 0,
  firstError: 0,
  secondError: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasResult(msg)) {
    Object.assign(result, Result(msg));
  }
});

export function useResult() {
  const resultRef = ref(result);

  watch(
    () => result,
    (resultValue) => (resultRef.value = resultValue)
  );

  return { result: resultRef };
}

export default result;
