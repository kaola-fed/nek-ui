const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const KLDrop = require('../index');

const KLDropHeader = Component.extend({
  name: 'kl-drop-header',
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {});
    this.supr();

    if (this.$outer && this.$outer instanceof KLDrop) {
      this.$outer.$header = this;
      this.$outer.$update();
    }
  },
});

module.exports = KLDropHeader;
