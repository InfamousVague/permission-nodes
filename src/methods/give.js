import { deepAssign, chainValidator } from '../utils';

export const give = function give(id) {
  this.id = id;

  // Safely create an ID if it doesn't yet exist.
  if (!this.options.permissions[this.id]) {
    this.options.permissions[this.id] = {};
  }

  this.handler = chain => {
    // Validate that our chain is of the proper type
    if (chainValidator(chain, 'give')) {
      const obj = {};
      let nextObj = obj;
      const unlinkedChain = chain.split('.');

      // create value on object, then go deeper
      const deepSetter = index => {
        // Create a new object at this level, but since we are not at the
        // end of the chain, don't give it full:true
        if (index + 1 < unlinkedChain.length) {
          nextObj[unlinkedChain[index]] = {};
          nextObj = nextObj[unlinkedChain[index]];

          // Move on to the next node in the chain
          deepSetter(index + 1);
        } else {
          // We've reached the end of the chain, when creating this object
          // set full: true
          nextObj[unlinkedChain[index]] = {
            full: true,
          };

          // Assign new object chain to permissions object
          this.options.permissions[this.id] = deepAssign(
            this.options.permissions[this.id],
            obj
          );
        }
      };

      deepSetter(0);
    }

    return this;
  };

  return this;
};
