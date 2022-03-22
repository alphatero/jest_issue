export function validateValue(
  value: string | number,
  max: string | number,
  min: string | number,
  specmax: string | number,
  specmin = 0
) {
  if (Number.isNaN(value) || Number.isNaN(max) || Number.isNaN(min))
    return false;
  if (max > specmax) return false;
  if (min < specmin) return false;
  if (value > max || value < min) return false;
  return true;
}

export function validateSimpleVal(
  value: string | number,
  specmax: string | number,
  specmin: string | number
) {
  if (Number.isNaN(value)) return false;
  if (value > specmax) return false;
  if (value < specmin) return false;
  return true;
}

export function validateIpSet(
  one: string | number,
  two: string | number,
  three: string | number,
  four: string | number
) {
  console.log(one, two, three, four);
  if (Number.isNaN(one) || one > 255 || one < 0) return false;
  if (Number.isNaN(two) || two > 255 || two < 0) return false;
  if (Number.isNaN(three) || three > 255 || three < 0) return false;
  if (Number.isNaN(four) || four > 255 || four < 0) return false;
  return true;
}
