/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasLockRule, LockRule } from "../../model/lock";

const lockRule = reactive({
  ngLock: 0,
  overMaxTorque: 0,
  overMinTorque: 0,
  overMaxTime: 0,
  overMinTime: 0,
  overMaxTurns: 0,
  overMinTurns: 0,
  lockSelect: "0",
  judgeSelect: 0,
  reduceRpm: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasLockRule(msg)) {
    Object.assign(lockRule, LockRule(msg));
  }
});

export function useLockRule() {
  const lockRuleRef = ref(lockRule);

  watch(
    () => lockRule,
    (lockRuleValue) => (lockRuleRef.value = lockRuleValue)
  );

  return { lockRule: lockRuleRef };
}

export default lockRule;
