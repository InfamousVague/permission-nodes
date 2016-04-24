const PermissionNodes = require('../../');

const permissionObject = {
  matt: {
    javascript: {
      ninja: {
        sword: {
          full: true
        },
        star: {
          full: true
        }
      }
    }
  },
};

const perm = new PermissionNodes({
  permissionObject: permissionObject
});

describe("when exporting a permissions object", function() {
  it("returns the correct object", function() {
    expect(perm.export()).toBe(permissionObject);
  });
});
