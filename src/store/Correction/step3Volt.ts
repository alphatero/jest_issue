/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
// eslint-disable-next-line import/named
import { hasMaxVoltage, MaxVoltage } from "../../model/view";

const maxVoltage = reactive({
  maxTorqueVoltage: 0,
  precision: 3,
  totalPoint: 0,
  curPoint: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasMaxVoltage(msg)) {
    Object.assign(maxVoltage, MaxVoltage(msg));
  }
});

export function useMaxVoltage() {
  const maxVoltageRef = ref(maxVoltage);

  watch(
    () => maxVoltage,
    (maxVoltageValue) => (maxVoltageRef.value = maxVoltageValue)
  );

  return { maxVoltage: maxVoltageRef };
}

export default maxVoltage;
