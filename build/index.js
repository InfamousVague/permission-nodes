'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));

var have = function have() {
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
};

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

var give = function give(id) {
  var _this = this;

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

        _this.options.permissions[_this.id] = deepAssign(_this.options.permissions[_this.id], obj);
      }
    };

    deepSetter(0);

    return _this;
  };
  return this;
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

module.exports = PermissionNodes;