/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasCorrection, Correction } from "../../model/view";

const correction = reactive({
  slope: 0,
  intercept: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasCorrection(msg)) {
    Object.assign(correction, Correction(msg));
  }
});

export function useCorrection() {
  const correctionRef = ref(correction);

  watch(
    () => correction,
    (correctionValue) => (correctionRef.value = correctionValue)
  );

  return { correction: correctionRef };
}

export default correction;
