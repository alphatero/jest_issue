/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

function isJSON(msg: string) {
  try {
    if (JSON.parse(msg)) return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}

/** @type {WebSocket} */
let ws: WebSocket;

const queue: any[] = [];

export enum FuncType {
  Open = "open",
  Msg = "msg",
  Close = "close",
}

type fun = (...args: any[]) => unknown;

type Content = {
  open: fun[];
  msg: fun[];
  close: fun[];
};

const map: Content = {
  open: [],
  msg: [],
  close: [],
};

type Msg = {
  data: string;
};

export default function Service(ip: string) {
  function addEventListener(type: FuncType, func: fun) {
    if (type in map) {
      map[type].push(func);
    }
  }

  function send(msg: string) {
    if (ws.readyState !== 1) {
      return queue.push(msg);
    }

    if (typeof msg === "object") {
      ws.send(JSON.stringify(msg));
    }

    if (typeof msg === "string") {
      ws.send(msg);
    }
  }

  if (ws) {
    return { addEventListener, send };
  }

  ws = new WebSocket(ip);

  ws.addEventListener("open", () => {
    while (queue.length) {
      send(queue.shift());
    }

    map.open.forEach((fn) => fn());

    ws.addEventListener("message", (event: MessageEvent<string>) => {
      const msg = <string>event.data;
      console.log(msg);

      if (!isJSON(msg) || JSON.parse(msg) === 1)
        return console.error(`not JSON ${msg}`);

      const data = JSON.parse(msg);
      console.log(data);
      map.msg.forEach((fn) => fn(data));
    });
  });

  ws.addEventListener("error", (error) => {
    console.log(error);
    alert("please reboot website");
  });

  ws.addEventListener("close", () => {
    console.log("close");
    alert("please reboot website");
  });

  return { addEventListener, send };
}
