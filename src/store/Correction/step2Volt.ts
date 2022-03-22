/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
// eslint-disable-next-line import/named
import { hasMinVoltage, MinVoltage } from "../../model/view";

const minVoltage = reactive({
  minTorqueVoltage: 0,
  precision: 3,
  totalPoint: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasMinVoltage(msg)) {
    Object.assign(minVoltage, MinVoltage(msg));
  }
});

export function useMinVoltage() {
  const minVoltageRef = ref(minVoltage);

  watch(
    () => minVoltage,
    (minVoltageValue) => (minVoltageRef.value = minVoltageValue)
  );

  return { minVoltage: minVoltageRef };
}

export default minVoltage;
