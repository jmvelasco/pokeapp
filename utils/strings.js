/**
 * Helper function to return a Capitalized string version
 */
String.prototype.toTitle = function () {
  return this.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
};
