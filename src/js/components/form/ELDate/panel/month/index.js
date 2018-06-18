import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';


const KLDatePickerPanel = Component.extend({
  name: 'kl-month-picker-panel',
  template,
  config() {
    _.extend(this.data, {
      value: new Date(),
      appendToBody: false,
      placement: 'top-right',
      isShow: false,
    });
    this.supr();

    this.data.valueDate = new Date(this.data.value);
    this.data.defaultValueDate = new Date(this.data.defaultValue);
  },
  computed: {
    year() {
      return this.data.value.getFullYear();
    },
    month() {
      return this.data.value.getMonth() + 1;
    },
  },
  init() {
    this.supr();
  },
  onClick() {
    this.data.isShow = !this.data.isShow;
  },
});

module.exports = KLDatePickerPanel;
