const Regular = require('regularjs');
const _ = require('./_');
const filter = require('./filter');
const directive = require('./directive');
const animation = require('./animation');

const Component = Regular.extend({
    /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      readonly: false,
      disabled: false,
      visible: true,
      class: '',
      console: typeof console === 'undefined' ? undefined : console,
    });
    this.supr();
  },
    /**
     * @protected
     */
  defaults(data) {
    this.data = Object.assign(data, this.data);
  },
    /**
     * @protected
     */
  rules(attris) {
    this.data = Object.assign(attris, this.data);
  },
    /**
     * @protected
     */
  reset() {
    this.data = {};
    this.config();
  },
  $trans(key) {
    return _.$trans(key, this);
  },
})
    .filter(filter)
    .directive(directive);

animation.install(Regular);

module.exports = Component;
