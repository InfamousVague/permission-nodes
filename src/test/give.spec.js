const PermissionNodes = require('../../');
const perm = new PermissionNodes({
  matt: {},
});

describe("give(): when giving access to a node", function() {
  it("nodes return false when node has not been given yet", function() {
    expect(perm.does('matt').have().node('javascript.hacker')).toBe(false);
  });

  it("returns true when the node has been given", function() {
    perm.give('matt').node('javascript.hacker');
    expect(perm.does('matt').have().node('javascript.hacker')).toBe(true);
  });

  it("can give node to id which doesn't yet exist", function() {
    perm.give('james').node('javascript.hacker');
    expect(perm.does('james').have().node('javascript.hacker')).toBe(true);
  });

  it("adds the permission node to the lowest node only", function() {
    expect(perm.does('matt').have().node('javascript')).toBe(false);
  });

  it("chains gives", function() {
    perm.give('matt')
      .node('javascript.nerd')
      .node('javascript.ninja')
      .node('javascript.noob');

    expect(perm.does('matt').have().node('javascript.nerd')).toBe(true);
    expect(perm.does('matt').have().node('javascript.ninja')).toBe(true);
    expect(perm.does('matt').have().node('javascript.noob')).toBe(true);
  });
});
