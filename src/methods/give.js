import { deepAssign } from '../utils';

export const give = function give(id) {
  this.id = id;
  this.handler = chain => {
    const obj = {};
    let nextObj = obj;
    const unlinkedChain = chain.split('.');

    // create value on object, then go deeper
    const deepSetter = index => {
      if (index + 1 < unlinkedChain.length) {
        nextObj[unlinkedChain[index]] = {};
        nextObj = nextObj[unlinkedChain[index]];
        deepSetter(index + 1);
      } else {
        nextObj[unlinkedChain[index]] = {
          full: true,
        };

        this.options.permissions[this.id] = deepAssign(
          this.options.permissions[this.id],
          obj
        );
      }
    };

    deepSetter(0);

    return this;
  };
  return this;
};
