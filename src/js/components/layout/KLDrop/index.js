/* eslint no-unused-vars: 0 */
import KLPopper from '../KLPopper/index';

const Component = require('../../../ui-base/sourceComponent');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

const KLDrop = Component.extend({
  name: 'kl-drop',
  template,
  $header: null,
  config() {
    _.extend(this.data, {
      appendToBody: false,
      placement: 'bottom',
      isShow: false,
      headerClass: '',
    });
    this.supr();
  },
  onClick(event) {
    this.data.isShow = !this.data.isShow;
    if (this.data.isShow) {
      this.$emit('click', {
        isShow: this.data.isShow,
        event,
      });
    }
  },
});

module.exports = KLDrop;
