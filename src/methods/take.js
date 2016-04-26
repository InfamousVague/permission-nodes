export const take = function take(id) {
  this.id = id;
  this.handler = chain => {
    const unlinkedChain = chain.split('.');
    let nextObj = this.permissions[this.id];

    // create value on object, then go deeper
    const deepSetter = index => {
      if (index + 1 < unlinkedChain.length) {
        nextObj = nextObj[unlinkedChain[index]];
        deepSetter(index + 1);
      } else {
        delete nextObj[unlinkedChain[index]];
      }
    };

    deepSetter(0);

    return this;
  };
  return this;
};
