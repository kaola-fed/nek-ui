const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const template = require('./index.html');

const KLDropMenu = Component.extend({
  name: 'kl-drop-menu',
  template,
  config() {
    _.extend(this.data, {});
    this.supr();
  },
});

module.exports = KLDropMenu;
