export const mul = (a: number) => (b: number) => a * b;

export const torqueRev = mul(1000);
export const timeRev = mul(100);
export const turnsRev = mul(10);

export function offsetRev(val: number) {
  const newVal = val * 1000;
  if (newVal < 0) {
    const minuseValue = 32768;
    return minuseValue - newVal;
  }
  return newVal;
}
