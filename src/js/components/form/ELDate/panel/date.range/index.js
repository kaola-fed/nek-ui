
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';

import {
    modifyWithDefaultTime,
} from '../../util';

import ClickMixin from './mixins/click.mixin';

const KLDateRangePickerPanel = Component.extend({
  name: 'kl-date-range-picker-panel',
  template,
  config() {
    _.extend(this.data, {
      value: new Date(),
      leftDate: new Date(),
    });
    this.supr();

    this.data.valueDate = new Date(this.data.value);
    this.data.defaultValueDate = new Date(this.data.defaultValue);
  },
  init() {
    this.supr();
  },
  handleRangePick(val, close = true) {
    const defaultTime = this.defaultTime || [];
    const minDate = modifyWithDefaultTime(val.minDate, defaultTime[0]);
    const maxDate = modifyWithDefaultTime(val.maxDate, defaultTime[1]);

    if (this.maxDate === maxDate && this.minDate === minDate) {
      return;
    }
    this.onPick && this.onPick(val);
    this.maxDate = maxDate;
    this.minDate = minDate;

    // workaround for https://github.com/ElemeFE/element/issues/7539, should remove this block when we don't have to care about Chromium 55 - 57
    setTimeout(() => {
      this.maxDate = maxDate;
      this.minDate = minDate;
    }, 10);
    if (!close || this.showTime) return;
    this.handleConfirm();
  },
}).use(ClickMixin);

module.exports = KLDateRangePickerPanel;
