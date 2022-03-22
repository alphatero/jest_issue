/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasTime, Time } from "../../model/view";

const time = reactive({
  target: 0,
  max: 0,
  min: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasTime(msg)) {
    Object.assign(time, Time(msg));
  }
});

export function useTime() {
  const timeRef = ref(time);

  watch(
    () => time,
    (timeValue) => (timeRef.value = timeValue)
  );

  return { time: timeRef };
}

export default time;
