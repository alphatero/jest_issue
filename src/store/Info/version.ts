/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasVersion, Version } from "../../model/view";

const version = reactive({
  firmware: "",
  software: "",
  controller: "",
  tool: "",
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasVersion(msg)) {
    Object.assign(version, Version(msg));
  }
});

export function useVersion() {
  const versionRef = ref(version);

  watch(
    () => version,
    (versionValue) => (versionRef.value = versionValue)
  );

  return { version: versionRef };
}

export default version;
