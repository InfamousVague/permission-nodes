var component = (function (_classCallCheck,_createClass,_typeof) {
  'use strict';

  _classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
  _createClass = 'default' in _createClass ? _createClass['default'] : _createClass;
  _typeof = 'default' in _typeof ? _typeof['default'] : _typeof;

  var deepAssign = function deepAssign(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        var value = source[key];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value) {
          target[key] = target[key] || {};
          deepAssign(target[key], value);
        } else {
          target[key] = value;
        }
      }
    }
    return target;
  };

  var chainValidator = function chainValidator(chain) {
    if (typeof chain !== 'string') {
      throw new TypeError('The chain (' + chain + ') supplied is invalid. Expected string, got ' + (typeof chain === 'undefined' ? 'undefined' : _typeof(chain)));
    }

    return chain;
  };

  var have = function have() {
    var _this = this;

    this.handler = function (chain) {
      var has = false;

      // Make sure the id we're looking up actually exists.
      if (_this.options.permissions[_this.id]) {
        // Validate that our chain is of the correct type
        if (chainValidator(chain)) {
          (function () {
            // Check to see if object is full, this allows for key: true, instead of
            // just using key: { full: true }, both work though.
            var topLevelCheck = function topLevelCheck(thing) {
              var topLevel = false;

              if (thing instanceof Object) {
                topLevel = thing.full || false;
              } else {
                topLevel = thing || false;
              }

              return topLevel;
            };

            var unlink = function unlink(block, n) {
              // If it is a nested node
              if (n.split('.').length) {
                if (block[n.split('.')[0]]) {
                  if (block[n.split('.')[0]].full) {
                    has = topLevelCheck(block[n.split('.')[0]]);
                  } else {
                    // N splits into more nodes, let's go deeper.
                    if (block[n.substr(0, n.indexOf('.'))]) {
                      // block exists, run it again
                      unlink(block[n.substr(0, n.indexOf('.'))], n.substr(n.indexOf('.') + 1));
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
            unlink(_this.options.permissions[_this.id], chain);
          })();
        }
      }

      return has;
    };

    return this;
  };

  var give = function give(id) {
    var _this = this;

    this.id = id;

    // Safely create an ID if it doesn't yet exist.
    if (!this.options.permissions[this.id]) {
      this.options.permissions[this.id] = {};
    }

    this.handler = function (chain) {
      // Validate that our chain is of the proper type
      if (chainValidator(chain)) {
        (function () {
          var obj = {};
          var nextObj = obj;
          var unlinkedChain = chain.split('.');

          // create value on object, then go deeper
          var deepSetter = function deepSetter(index) {
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
                full: true
              };

              // Assign new object chain to permissions object
              _this.options.permissions[_this.id] = deepAssign(_this.options.permissions[_this.id], obj);
            }
          };

          deepSetter(0);
        })();
      }

      return _this;
    };

    return this;
  };

  var take = function take(id) {
    var _this = this;

    this.id = id;
    this.handler = function (chain) {
      var unlinkedChain = chain.split('.');
      var nextObj = _this.options.permissions[_this.id];

      // create value on object, then go deeper
      var deepSetter = function deepSetter(index) {
        if (index + 1 < unlinkedChain.length) {
          nextObj = nextObj[unlinkedChain[index]];
          deepSetter(index + 1);
        } else {
          delete nextObj[unlinkedChain[index]];
        }
      };

      deepSetter(0);

      return _this;
    };
    return this;
  };

  var nodes = function nodes(chains) {
    var _this = this;

    var pass = true;

    var chainIterator = function chainIterator(index) {
      if (_this.node(chains[index])) {
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

  /**
   * Creates a new PermissionNodes group.
   * @class
   */

  var PermissionNodes = function () {
    /**
    * @constructs PermissionNodes
    * @param {object} options - options such as permFile etc
    * @param {string} options.permFile - file we should save to.
    */

    function PermissionNodes(options) {
      _classCallCheck(this, PermissionNodes);

      this.options = {
        permissions: options ? options.permissionObject || false : {}
      };

      this.id = null;

      this.handler = function () {/* noop */};
    }

    /**
     * does
     * @method does
     * @param {string} id - the id to act on
     * @returns {object} this - returns PermissionNodes class.
    */


    _createClass(PermissionNodes, [{
      key: 'does',
      value: function does(id) {
        this.id = id;
        return this;
      }

      /**
       * have sets hadnler to check if id has node.
       * @method have
       * @returns {object} this - returns PermissionNodes class.
      */

    }, {
      key: 'have',
      value: function have$$() {
        return have.call(this);
      }

      /**
       * give gives the id a node
       * @method give
       * @returns {object} this - returns PermissionNodes class.
      */

    }, {
      key: 'give',
      value: function give$$(id) {
        return give.call(this, id);
      }

      /**
       * take takes the node from an id
       * @method take
       * @returns {object} this - returns PermissionNodes class.
      */

    }, {
      key: 'take',
      value: function take$$(id) {
        return take.call(this, id);
      }

      /**
       * node calls this.helper with the supplied node chain.
       * @method node
       * @param {string} chain - permission node chain
       * @returns {boolean} - returns boolean value
      */

    }, {
      key: 'node',
      value: function node(chain) {
        return this.handler(chain);
      }

      /**
       * nodes calls this.helper on multiple chains.
       * @method nodes
       * @param {array} chains - permission node chains
       * @returns {boolean} - returns boolean value
      */

    }, {
      key: 'nodes',
      value: function nodes$$(chains) {
        return nodes.call(this, chains);
      }

      /**
       * imports a new permissions object
       * @method import
      */

    }, {
      key: 'import',
      value: function _import(permissions) {
        this.options.permissions = permissions;
      }

      /**
       * export returns the permissions object.
       * @method export
       * @returns {object} - returns permissions object
      */

    }, {
      key: 'export',
      value: function _export() {
        return this.options.permissions;
      }
    }]);

    return PermissionNodes;
  }();

  return PermissionNodes;

}(_classCallCheck,_createClass,_typeof));