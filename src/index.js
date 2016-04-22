/**
 * Creates a new PermissionNodes group.
 * @class
 */
class PermissionNodes {
  /**
  * @constructs PermissionNodes
  * @param {object} options - options such as permFile etc
  * @param {string} options.permFile - file we should save to.
  */
  constructor(options) {
    this.options = {
      permissions: (options) ? options.permissionObject : {},
    };

    this.id = null;

    this.handler = () => {};
  }

  /**
   * does
   * @method does
   * @param {string} id - the id to act on
   * @returns {object} this - returns PermissionNodes class.
  */
  does(id) {
    this.id = id;
    return this;
  }

  /**
   * have sets hadnler to check if id has node.
   * @method have
   * @returns {object} this - returns PermissionNodes class.
  */
  have() {
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
  }

  /**
   * give gives the id a node
   * @method give
   * @returns {object} this - returns PermissionNodes class.
  */
  give(id) {
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

          this.options.permissions[this.id] = Object.assign(
            this.options.permissions[this.id],
            obj,
            {}
          );
          console.log(JSON.stringify(this.options.permissions[this.id]));
        }
      };

      deepSetter(0);

      return this;
    };
    return this;
  }

  take() {

  }

  node(chain) {
    return this.handler(chain);
  }

}

export default PermissionNodes;
