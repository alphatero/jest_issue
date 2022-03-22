/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasIp, Ip } from "../../model/view";

const ip: IpType = reactive({
  addr: "192.168.0.1",
  ip1: "192",
  ip2: "168",
  ip3: "1",
  ip4: "112",
});

interface IpType {
  [key: string]: string;
}

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasIp(msg)) {
    Object.assign(ip, Ip(msg));
  }
});

export function useIp() {
  const ipRef = ref(ip);

  watch(
    () => ip,
    (ipValue) => (ipRef.value = ipValue)
  );

  return { ip: ipRef };
}

export default ip;
