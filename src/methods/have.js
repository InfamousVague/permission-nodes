export const have = function have() {
  this.handler = chain => {
    let has = false;
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
      } else {
        // no nested nodes
        has = topLevelCheck(block[n]);
      }
    };

    unlink(this.options.permissions[this.id], chain);

    return has;
  };

  return this;
};
