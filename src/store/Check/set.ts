/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasSet, Set } from "../../model/check";

const set = reactive({
  setParamOk: 0,
  setMasterOk: 0,
  setMan1Ok: 0,
  setMan2Ok: 0,
  setTimeOk: 0,
  setSystemOk: 0,
  setDeviceOk: 0,
  setIpOk: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasSet(msg)) {
    Object.assign(set, Set(msg));
  }
});

export function useSet() {
  const setRef = ref(set);

  watch(
    () => set,
    (setValue) => (setRef.value = setValue)
  );

  return { set: setRef };
}

export default set;
