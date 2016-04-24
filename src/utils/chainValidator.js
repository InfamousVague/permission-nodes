export const chainValidator = function chainValidator(chain) {
  if (typeof chain !== 'string') {
    throw new TypeError(
      `The chain (${chain}) supplied is invalid. Expected string, got ${typeof chain}`
    );
  }

  return chain;
};
