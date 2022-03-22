export function torqueRev(val: number) {
  return val * 1000;
}

export function timeRev(val: number) {
  return val * 100;
}

export function turnsRev(val: number) {
  return val * 10;
}

export function offsetRev(val: number) {
  const newVal = val * 1000;
  const minuseValue = 32768;
  if (newVal < 0) {
    return minuseValue - newVal;
  }
  return newVal;
}
