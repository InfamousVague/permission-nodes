export const chainValidator = function chainValidator(chains) {
  if (!Array.isArray(chains)) {
    throw new TypeError(
      `The chains (${chains}) supplied is invalid. Expected Array, got ${typeof chain}`
    );
  }

  return chains;
};
