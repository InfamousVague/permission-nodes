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

const perm = new PermissionNodes(permissionObject);

describe("export(): when exporting a permissions object", function() {
  it("returns the correct object", function() {
    expect(perm.export()).toBe(permissionObject);
  });
});
