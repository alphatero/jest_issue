/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasUpdate, Update } from "../../model/check";

const update = reactive({
  bootloadOk: 0,
  updateOk: 0,
  progress: 0,
  showFile: "",
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasUpdate(msg)) {
    Object.assign(update, Update(msg));
  }
});

export function useUpdate() {
  const updateRef = ref(update);

  watch(
    () => update,
    (updateValue) => (updateRef.value = updateValue)
  );

  return { update: updateRef };
}

export default update;
