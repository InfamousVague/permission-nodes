export const chainValidator = function chainValidator(chain, method) {
  if (typeof chain !== 'string') {
    throw new TypeError(
      `The chain (${chain}) supplied is invalid. Expected string, got ${typeof chain}.
      You should check what you're passing to the .${method}() method`
    );
  }

  return chain;
};
