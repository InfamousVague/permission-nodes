export const chainValidator = function chainValidator(chains, method) {
  if (!Array.isArray(chains)) {
    throw new TypeError(
      `The chains (${chains}) supplied is invalid. Expected Array, got ${typeof chain}.
      You should check what you're passing to the .${method}() method`
    );
  }

  return chains;
};
