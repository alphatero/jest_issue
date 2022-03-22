/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasScrew, Screw } from "../../model/view";

const screw = reactive({
  current: 0,
  total: 0,
  countLock: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasScrew(msg)) {
    Object.assign(screw, Screw(msg));
  }
});

export function useScrew() {
  const screwRef = ref(screw);

  watch(
    () => screw,
    (screwValue) => (screwRef.value = screwValue)
  );

  return { screw: screwRef };
}

export default screw;
