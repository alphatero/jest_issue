/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasTurns, Turns } from "../../model/view";

const turns = reactive({
  target: 0,
  max: 0,
  min: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasTurns(msg)) {
    Object.assign(turns, Turns(msg));
  }
});

export function useTurns() {
  const turnsRef = ref(turns);

  watch(
    () => turns,
    (turnsValue) => (turnsRef.value = turnsValue)
  );

  return { turns: turnsRef };
}

export default turns;
