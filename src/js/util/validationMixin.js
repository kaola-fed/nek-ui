const Validation = require('./validation');

module.exports = function (Component) {
  Component.implement({
    initValidation() {
      let $outer = this;
      do {
        if ($outer.$outer) {
          $outer = $outer.$outer;
        } else if ($outer.$parent) {
          $outer = $outer.$parent;
        }
      } while (
        !($outer instanceof Validation) && ($outer.$outer || $outer.$parent)
      );

      if ($outer && $outer instanceof Validation) {
        $outer.controls.push(this);
        /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
        this._parentValidator = $outer;

        this.$on('destroy', function () {
          const index = $outer.controls.indexOf(this);
          if (index !== -1) {
            $outer.controls = $outer.controls.splice(index, 1);
          }
        });
      }
    },
  });
};
