/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasUnit, Unit } from "../../model/view";

const unit = reactive({
  value: 0,
  name: "Nm",
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasUnit(msg)) {
    console.log("hasUnit");
    Object.assign(unit, Unit(msg));
  }
});

export function useUnit() {
  const unitRef = ref(unit);

  watch(
    () => unit,
    (unitValue) => (unitRef.value = unitValue)
  );

  return { unit: unitRef };
}

export default unit;
