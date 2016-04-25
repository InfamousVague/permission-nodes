const PermissionNodes = require('../../');
const perm = new PermissionNodes();

describe("import(): when importing a permissions object", function() {
  it("have returns false before import", function() {
    expect(perm.does('matt').have().node('javascript.ninja.sword')).toBe(false);
  });

  it("returns true after import", function() {
    perm.import({
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
    expect(perm.does('matt').have().node('javascript.ninja.sword')).toBe(true);
  });
});
