const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const template = require('./index.html');

const KLDropItem = Component.extend({
  name: 'kl-drop-item',
  template,
  config() {
    _.extend(this.data, {});
    this.supr();
  },
  onClick() {
    //
  },
});

module.exports = KLDropItem;
