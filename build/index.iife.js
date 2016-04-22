var component = (function (_JSON$stringify,_Object$assign,_classCallCheck,_createClass) {
  'use strict';

  _JSON$stringify = 'default' in _JSON$stringify ? _JSON$stringify['default'] : _JSON$stringify;
  _Object$assign = 'default' in _Object$assign ? _Object$assign['default'] : _Object$assign;
  _classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
  _createClass = 'default' in _createClass ? _createClass['default'] : _createClass;

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
        permissions: options ? options.permissionObject : {}
      };

      this.id = null;

      this.handler = function () {};
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
      value: function have() {
        var _this = this;

        this.handler = function (chain) {
          var has = false;
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
              // N splits into more nodes, let's go deeper.
              if (block[n.substr(0, n.indexOf('.'))]) {
                // block exists, run it again
                unlink(block[n.substr(0, n.indexOf('.'))], n.substr(n.indexOf('.') + 1));
              } else {
                has = topLevelCheck(block[n]);
              }
            } else {
              // no nested nodes
              has = topLevelCheck(block[n]);
            }
          };

          unlink(_this.options.permissions[_this.id], chain);

          return has;
        };

        return this;
      }

      /**
       * give gives the id a node
       * @method give
       * @returns {object} this - returns PermissionNodes class.
      */

    }, {
      key: 'give',
      value: function give(id) {
        var _this2 = this;

        this.id = id;
        this.handler = function (chain) {
          var obj = {};
          var nextObj = obj;
          var unlinkedChain = chain.split('.');

          // create value on object, then go deeper
          var deepSetter = function deepSetter(index) {
            if (index + 1 < unlinkedChain.length) {
              nextObj[unlinkedChain[index]] = {};
              nextObj = nextObj[unlinkedChain[index]];
              deepSetter(index + 1);
            } else {
              nextObj[unlinkedChain[index]] = {
                full: true
              };

              _this2.options.permissions[_this2.id] = _Object$assign(_this2.options.permissions[_this2.id], obj, {});
              console.log(_JSON$stringify(_this2.options.permissions[_this2.id]));
            }
          };

          deepSetter(0);

          return _this2;
        };
        return this;
      }
    }, {
      key: 'take',
      value: function take() {}
    }, {
      key: 'node',
      value: function node(chain) {
        return this.handler(chain);
      }
    }]);

    return PermissionNodes;
  }();

  return PermissionNodes;

}(_JSON$stringify,_Object$assign,_classCallCheck,_createClass));