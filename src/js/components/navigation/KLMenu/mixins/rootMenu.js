module.exports = function(Component) {
  Component.implement({
    initRootMenu: function() {
      var $outer = this;
      do {
        if ($outer.$outer) {
          $outer = $outer.$outer;
        } else if ($outer.$parent) {
          $outer = $outer.$parent;
        }} while(($outer.__proto__.name !== 'kl-menu') && ($outer.$outer || $outer.$parent));

      if ($outer && $outer.__proto__.name === 'kl-menu') {
        this.data.rootMenu = $outer;
      }
    }
  });
}
