/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

/**
 * if data is not JSON format, console error.
 */
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

/**
 * queue about actions.
 */
const queue: any[] = [];

/**
 * function type in websocket addEventListener
 */
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

/**
 * map fuction each addEvent
 */
const map: Content = {
  open: [],
  msg: [],
  close: [],
};

type Msg = {
  data: string;
};

/**
 * websocket server
 */
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

  /**
   * websocket status open
   */
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

  /**
   * websocket status error
   */
  ws.addEventListener("error", (error) => {
    console.log(error);
    alert("please reboot website");
  });

  /**
   * websocket status close
   */
  ws.addEventListener("close", () => {
    console.log("close");
    alert("please reboot website");
  });

  return { addEventListener, send };
}
