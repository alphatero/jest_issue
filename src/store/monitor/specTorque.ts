/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasSpecTorque, SpecTorque } from "../../model/view";

const spec = reactive({
  max: 0,
  min: 0,
  unit: "",
  maxUpper: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasSpecTorque(msg)) {
    Object.assign(spec, SpecTorque(msg));
  }
});

export function useSpecTorque() {
  const specRef = ref(spec);

  watch(
    () => spec,
    (specValue) => (specRef.value = specValue)
  );

  return { spec: specRef };
}

export default spec;
