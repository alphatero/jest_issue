/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasSpeed, Speed } from "../../model/view";

const speed = reactive({
  val: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasSpeed(msg)) {
    Object.assign(speed, Speed(msg));
  }
});

export function useSpeed() {
  const speedRef = ref(speed);

  watch(
    () => speed,
    (speedValue) => (speedRef.value = speedValue)
  );

  return { speed: speedRef };
}

export default speed;
