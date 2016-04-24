import { have, give, take, nodes } from './methods';

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
      permissions: (options) ? options.permissionObject || false : {},
    };

    this.id = null;

    this.handler = () => {/* noop */};
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
    return have.call(this);
  }

  /**
   * give gives the id a node
   * @method give
   * @returns {object} this - returns PermissionNodes class.
  */
  give(id) {
    return give.call(this, id);
  }

  /**
   * take takes the node from an id
   * @method take
   * @returns {object} this - returns PermissionNodes class.
  */
  take(id) {
    return take.call(this, id);
  }

  /**
   * node calls this.helper with the supplied node chain.
   * @method node
   * @param {string} chain - permission node chain
   * @returns {boolean} - returns boolean value
  */
  node(chain) {
    return this.handler(chain);
  }

  /**
   * nodes calls this.helper on multiple chains.
   * @method nodes
   * @param {array} chains - permission node chains
   * @returns {boolean} - returns boolean value
  */
  nodes(chains) {
    return nodes.call(this, chains);
  }

  /**
   * imports a new permissions object
   * @method import
  */
  import(permissions) {
    this.options.permissions = permissions;
  }

  /**
   * export returns the permissions object.
   * @method export
   * @returns {object} - returns permissions object
  */
  export() {
    return this.options.permissions;
  }

}

export default PermissionNodes;
