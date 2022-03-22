import { Msg } from "../../types";

/* eslint-disable no-bitwise */
export function hasIp(msg: Msg) {
  return "ip1" in msg && "ip2" in msg && "ip3" in msg && "ip4" in msg;
}

type Props = {
  ip1: number;
  ip2: number;
  ip3: number;
  ip4: number;
};

export function Ip({ ip1, ip2, ip3, ip4 }: Props) {
  return {
    addr: `${ip1}.${ip2}.${ip3}.${ip4}`,
    ip1: ip1.toString(),
    ip2: ip2.toString(),
    ip3: ip3.toString(),
    ip4: ip4.toString(),
  };
}
