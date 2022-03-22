/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasAutoSave, AutoSave } from "../../model/Data";

const autoSave = reactive({
  val: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasAutoSave(msg)) {
    Object.assign(autoSave, AutoSave(msg));
  }
});

export function useAutoSave() {
  const autoSaveRef = ref(autoSave);

  watch(
    () => autoSave,
    (autoSaveValue) => (autoSaveRef.value = autoSaveValue)
  );

  return { autoSave: autoSaveRef };
}

export default autoSave;
