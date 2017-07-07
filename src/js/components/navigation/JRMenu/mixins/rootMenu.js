const JRMenu = require('../index');

module.exports = function (Component) {
  Component.implement({
    initRootMenu() {
      let $outer = this;
      do {
        if ($outer.$outer) {
          $outer = $outer.$outer;
        } else if ($outer.$parent) {
          $outer = $outer.$parent;
        }
      } while (
        !($outer instanceof JRMenu) && ($outer.$outer || $outer.$parent)
      );

      if ($outer && $outer instanceof JRMenu) {
        this.data.rootMenu = $outer;
      }
    },
  });
};
