

export function resolveMultipliedNumber(num: string | number) {
  if (typeof num === 'number') {
    return num;
  }
  return num.split('*').reduce((acc, v) => acc * Number(v.trim()), 1);
}