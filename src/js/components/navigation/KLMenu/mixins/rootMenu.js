var KLMenu = require('../index');

module.exports = function(Component) {
  Component.implement({
    initRootMenu: function() {
      var $outer = this;
      do {
        if ($outer.$outer) {
          $outer = $outer.$outer;
        } else if ($outer.$parent) {
          $outer = $outer.$parent;
        }} while(!($outer instanceof KLMenu) && ($outer.$outer || $outer.$parent));

      if ($outer && $outer instanceof KLMenu) {
        this.data.rootMenu = $outer;
      }
    }
  });
}
