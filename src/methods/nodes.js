export const nodes = function nodes(chains) {
  let pass = true;

  const chainIterator = index => {
    if (this.node(chains[index])) {
      if (index + 1 <= chains.length) {
        chainIterator(index + 1);
      }
    } else {
      pass = false;
    }
  };

  chainIterator(0);

  return pass;
};
