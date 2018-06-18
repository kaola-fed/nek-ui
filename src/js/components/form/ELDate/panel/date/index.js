import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';
import {
    prevYear,
    nextYear,
    prevMonth,
    nextMonth,
} from '../../util';

const KLDatePickerPanel = Component.extend({
  name: 'kl-date-picker-panel',
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
  handleDatePick(e) {
    this.data.value = e.value;
        // this.data.month = e.month;
        // console.log(e.month)
        // this.$update();
  },
  preYear() {
    this.data.value = prevYear(this.data.value);
  },
  preMonth() {
    this.data.value = prevMonth(this.data.value);
  },
  nextYear() {
    this.data.value = nextYear(this.data.value);
  },
  nextMonth() {
    this.data.value = nextMonth(this.data.value);
  },
  onClick() {
    this.data.isShow = !this.data.isShow;
  },
});

module.exports = KLDatePickerPanel;
