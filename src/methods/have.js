import { chainValidator } from '../utils';

export const have = function have() {
  this.handler = chain => {
    let has = false;

    // Make sure the id we're looking up actually exists.
    if (this.options.permissions[this.id]) {
      // Validate that our chain is of the correct type
      if (chainValidator(chain, 'have')) {
        // Check to see if object is full, this allows for key: true, instead of
        // just using key: { full: true }, both work though.
        const topLevelCheck = thing => {
          let topLevel = false;

          if (thing instanceof Object) {
            topLevel = thing.full || false;
          } else {
            topLevel = thing || false;
          }

          return topLevel;
        };

        const unlink = (block, n) => {
          // If it is a nested node
          if (n.split('.').length) {
            if (block[n.split('.')[0]]) {
              if (block[n.split('.')[0]].full) {
                has = topLevelCheck(block[n.split('.')[0]]);
              } else {
                // N splits into more nodes, let's go deeper.
                if (block[n.substr(0, n.indexOf('.'))]) {
                  // block exists, run it again
                  unlink(
                    block[n.substr(0, n.indexOf('.'))],
                    n.substr(n.indexOf('.') + 1)
                  );
                } else {
                  has = topLevelCheck(block[n]);
                }
              }
            } else {
              has = false;
            }
          } else {
            // no nested nodes
            has = topLevelCheck(block[n]);
          }
        };

        // Start unlinking our chain and doing checks
        unlink(this.options.permissions[this.id], chain);
      }
    }

    return has;
  };

  return this;
};
