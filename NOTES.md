# Intended functionality

```javascript
const PermissionNodes = require('permission-nodes');
const perm = new PermissionNodes({
  permFile: './path/to/permfile'
});

// Check permissions
perm.does('matt').have().node('admin.promote'); // ture or false
// would access users['matt'].nodes['admin']['promote'] // return value

// grant nodes
perm.give('matt').node('admin.promote');
// would give users['matt'].nodes['admin']['promote'] = true;

// revoke nodes
perm.take('matt').node('admin.promote');
// would take users['matt'].nodes['admin']['promote'] = false;
```
