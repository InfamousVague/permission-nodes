const PermissionNodes = require('../../');
const perm = new PermissionNodes(
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
});

describe("take(): when removing access to a node", function() {
  it("nodes return true when node has not been revoked yet", function() {
    expect(perm.does('matt').have().node('javascript.ninja.sword')).toBe(true);
  });

  it("returns false when the node has been taken", function() {
    perm.take('matt').node('javascript.ninja.sword');
    expect(perm.does('matt').have().node('javascript.ninja.sword')).toBe(false);
  });

  it("other values within node stay intact", function() {
    expect(perm.does('matt').have().node('javascript.ninja.star')).toBe(true);
  });

  it("chains removals", function() {
    perm.give('matt').node('javascript.ninja.sword');
    perm.take('matt').node('javascript.ninja.sword').node('javascript.ninja.star');
    expect(perm.does('matt').have().node('javascript.ninja.sword')).toBe(false);
    expect(perm.does('matt').have().node('javascript.ninja.star')).toBe(false);
  });
});
