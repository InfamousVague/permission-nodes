# permission-nodes
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

### .export()
export the current permissions object
```javascript
perm.export(); // [object Object]
```
