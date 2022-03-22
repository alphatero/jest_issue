/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasDevice, Device } from "../../model/view";

const device = reactive({
  number: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasDevice(msg)) {
    Object.assign(device, Device(msg));
  }
});

export function useDevice() {
  const deviceRef = ref(device);

  watch(
    () => device,
    (deviceValue) => (deviceRef.value = deviceValue)
  );

  return { device: deviceRef };
}

export default device;
