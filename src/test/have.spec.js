const PermissionNodes = require('../../');
const perm = new PermissionNodes({
  permissionObject: {
    matt: {},
  },
});

describe("has(): when seeing if a user has a node", function() {
  it("role doesn't return true with no node present", function() {
    expect(perm.does('matt').have().node('javascript.hacker')).toBe(false);
  });

  it("returns true for a child roles access, when granting access to parent role", function() {
    perm.give('matt').node('javascript');
    expect(perm.does('matt').have().node('javascript.hacker')).toBe(true);
  });

  it("returns true when a child node is checked", function() {
    perm.give('matt').node('npm.create.module');
    expect(perm.does('matt').have().node('npm.create.module')).toBe(true);
  });

  it("returns false when the parent node of the granted child node is checked", function() {
    expect(perm.does('matt').have().node('npm.create')).toBe(false);
  });

  it("allows a range of nodes to pass", function() {
    perm.give('matt')
      .node('npm.create')
      .node('npm.delete');

    expect(perm.does('matt').have().nodes(['npm.create', 'npm.delete'])).toBe(true);
  });

  it("allows a range of nodes to fail", function() {
    perm.give('matt')
      .node('npm.create')
      .node('npm.publish');

    expect(perm.does('matt').have().nodes(['npm.create', 'npm.delete'])).toBe(true);
  });
});
