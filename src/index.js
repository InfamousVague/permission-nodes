import { have, give, take, nodes, inherit } from './methods';

/**
 * Creates a new PermissionNodes group.
 * @class
 */
class PermissionNodes {
  /**
  * @constructs PermissionNodes
  * @param {object} permissions - optional starting permission file
  */
  constructor(permissions = {}) {
    this.permissions = permissions;
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
   * inheritance deepAssigns the values of the specified group over the other id specified in give
   * @method inheritance
   * @param {string} id - the id which we should inherit
   * @returns {this} - returns this for chaining
  */
  inheritance(id) {
    return inherit.call(this, id);
  }

  /**
   * imports a new permissions object
   * @method import
  */
  import(permissions) {
    this.permissions = permissions;
    return this;
  }

  /**
   * export returns the permissions object.
   * @method export
   * @returns {object} - returns permissions object
  */
  export() {
    return this.permissions;
  }

}

export default PermissionNodes;
