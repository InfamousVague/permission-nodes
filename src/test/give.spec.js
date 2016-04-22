const PermissionNodes = require('../../');
const perm = new PermissionNodes({
  permissionObject: {
    matt: {},
  },
});

describe("When a user runs give", function() {
  it("adds the permission node(s)", function() {
    expect(perm.does('matt').have().node('javascript.hacker')).toBe(false);
    perm.give('matt').node('javascript.hacker');
    expect(perm.does('matt').have().node('javascript.hacker')).toBe(true);
  });
});

describe("When a user runs give", function() {
  it("adds the permission node to the lowest node only", function() {
    expect(perm.does('matt').have().node('javascript')).toBe(false);
  });
});
