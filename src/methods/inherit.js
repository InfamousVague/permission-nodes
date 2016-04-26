import { deepAssign } from '../utils';

export const inherit = function inherit(iid) {
  // If the id of the inheritee doesn't exist, make one.
  if (!this.permissions[this.id]) {
    this.permissions[this.id] = {};
  }

  // Make sure the id to inherit permissions form exists.
  if (this.permissions[iid]) {
    // Deep assign the inherit object
    this.permissions[this.id] = deepAssign(
      this.permissions[this.id],
      this.permissions[iid]
    );
  }

  return this;
};
