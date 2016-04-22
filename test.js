'use strict';

let permissionObject = {
  matt: {
    admin: {
      revoke: {
        admin: true,
      },
    },
    javascript: {
      full: true,
      hacker: {
        full: false,
      },
    },
  },
};

const PermissionNodes = require('./');
const perm = new PermissionNodes({
  permissionObject: permissionObject,
});

console.log(perm.does('matt').have().node('admin.revoke.admin')); // true
console.log(perm.does('matt').have().node('javascript')); // true
console.log(perm.does('matt').have().node('javascript.hacker')); // false
perm.give('matt').node('one.two.three');
perm.give('matt').node('one.two.four');
perm.give('matt').node('one.two.five');
console.log(perm.does('matt').have().node('one.two.three')); // true
perm.give('matt').node('javascript.hacker');
console.log(perm.does('matt').have().node('javascript.hacker')); // true
perm.give('matt').node('one.two.three.four');
console.log(perm.does('matt').have().node('one.two')); // false
