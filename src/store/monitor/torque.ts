/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasTorque, Torque } from "../../model/view";

const torque = reactive({
  target: 0,
  current: 0,
  max: 0,
  min: 0,
  unit: "Nm",
  precision: 2,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasTorque(msg)) {
    Object.assign(torque, Torque(msg));
  }
});

export function useTorque() {
  const torqueRef = ref(torque);
  // const specRef = ref(specTorque);

  watch(
    () => torque,
    (torqueValue) => (torqueRef.value = torqueValue)
  );

  return { torque: torqueRef };
}

export default torque;
