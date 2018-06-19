/* eslint no-unused-vars: 0 */
import KLPopper from '../KLPopper/index';

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

const KLDrop = Component.extend({
  name: 'kl-drop',
  template,
  $header: null,
  config() {
    _.extend(this.data, {
      appendToBody: false,
      placement: 'top-right',
      isShow: false,
    });
    this.supr();
  },
  onClick() {
    // if (this.trigger == 'custom') {
    //     this.isShowPopper = true;
    //     return;
    // }

    this.data.isShow = !this.data.isShow;
    if (this.data.isShow) {
      this.$emit('toggle');
    }
  },
});

module.exports = KLDrop;
