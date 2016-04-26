[![Build Status](https://img.shields.io/travis/wski/permission-nodes/master.svg?style=flat-square)](https://travis-ci.org/wski/permission-nodes)
[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![js-standard-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)](https://github.com/wski/ppermission-nodes)

Node based permissions for JavaScript.

## Setup

Install with npm
```bash
npm i --save permission-nodes
```
Require permission-nodes, create a new PermissionNodes and pass in a permission object (optional). You can import an existing, exported, permissions object here. (see below for .export()).

```javascript
const PermissionNodes = require('permission-nodes');
const perm = new PermissionNodes({
  permissionObject: {
    matt: {},
  },
});
```

## Usage

### .give()
give permission node...
```javascript
perm.give('matt').node('javascript');
```
...or give a bunch of nodes
```javascript
perm.give('matt')
  .node('javascript')
  .node('github.fork')
  .node('github.pr')
  .node('github.issue');
```

### .have()
check for a permission node...
```javascript
perm.does('matt').have().node('javascript'); // true
```
...or check for a bunch of nodes
```javascript
perm.does('matt').have().nodes([
  'javascript',
  'github.fork',
  'github.pr',
  'github.pr',
]); // true
```

### .take()

take a permission node away...
```javascript
perm.take('matt').node('javascript.ninja.sword');
```
...or take away a bunch of nodes...
```javascript
perm.take('matt')
  .node('github.fork')
  .node('github.pr')
  .node('github.pr');
```
...or a whole group
```javascript
perm.take('matt').node('github');
```

### .inheritance()
inherit nodes from another id...
```javascript
perm.give('james').inheritance('matt');
```

### .import()
hotload a new permissions object
```javascript
perm.import({your: 'permissions'});
```

### .export()
export the current permissions object
```javascript
perm.export(); // [object Object]
```
