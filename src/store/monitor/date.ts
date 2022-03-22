/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasDates, Dates } from "../../model/view";

const dates = reactive({
  year: 0,
  month: 0,
  day: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasDates(msg)) {
    Object.assign(dates, Dates(msg));
  }
});

export function useDates() {
  const datesRef = ref(dates);

  watch(
    () => dates,
    (datesValue) => (datesRef.value = datesValue)
  );

  return { dates: datesRef };
}

export default dates;
