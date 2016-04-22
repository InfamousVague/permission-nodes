export const deepAssign = function deepAssign(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const value = source[key];
      if (typeof value === 'object' && value) {
        target[key] = target[key] || {};
        deepAssign(target[key], value);
      } else {
        target[key] = value;
      }
    }
  }
  return target;
}
