var Menu = require('../index.js');

module.exports = function(Component) {
  Component.implement({
    initRootMenu: function() {
      var $outer = this;
      do {
        if ($outer.$outer) {
          $outer = $outer.$outer;
        } else if ($outer.$parent) {
          $outer = $outer.$parent;
        }} while(!($outer instanceof Menu) && ($outer.$outer || $outer.$parent));

      if ($outer && $outer instanceof Menu) {
        this.data.rootMenu = $outer;
      }
    }
  });
}
