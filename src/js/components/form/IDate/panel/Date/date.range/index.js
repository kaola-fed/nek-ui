/* eslint-disable */
import Component from '../../../../../../ui-base/component';
import _ from '../../../../../../ui-base/_';
import template from './index.html';

import DateTable from '../../../base/date.table/index';
import YearTable from '../../../base/year.table/index';
import MonthTable from '../../../base/month.table/index';
import Confirm from '../../../base/confirm/index';

import TimePicker from '../../Time/time/index';

import datePanelLabel from '../date.panel.label/index';

import { siblingMonth, formatDateLabels } from '../../../util';


const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';


const KLDatePickerPanel = Component.extend({
  name: 'kl-date-picker-panel',
  template,
  config() {
    _.extend(this.data, {
      confirm: false,
      showTime: false,
      format: 'yyyy-MM-dd',
      selectionMode: 'date',      // 'year', 'month', 'date', 'time'
      shortcuts: [],
      disabledDate: false,
      timePickerOptions: {},
      showWeekNumbers: false,
      startDate: new Date(),
      pickerType: '',      // required
      focusedDate: '',         // required
    });
    this.supr();
  },
  init() {
    this.supr;
    this.data.value = [initTimeDate(), initTimeDate()];
  },
  stopPropagation(e) {
    e.stopPropagation();
  },

    //

  iconBtnCls(direction, type = '') {
    return [
      `${prefixCls}-icon-btn`,
      `${datePrefixCls}-${direction}-btn`,
      `${datePrefixCls}-${direction}-btn-arrow${type}`,
    ].join(' ');
  },
  handleShortcutClick(shortcut) {
    if (shortcut.value) this.$emit('on-pick', shortcut.value());
    if (shortcut.onClick) shortcut.onClick(this);
  },
  handlePickClear() {
    this.resetView();
    this.$emit('on-pick-clear');
  },
  handlePickSuccess() {
    this.resetView();
    this.$emit('on-pick-success');
  },
  handlePickClick() {
    this.$emit('on-pick-click');
  },
  resetView() {
    setTimeout(
            () => this.data.currentView = this.data.selectionMode,
            500, // 500ms so the dropdown can close before changing
        );
  },
  handleClear() {
    this.data.dates = this.data.dates.map(() => null);
    this.data.rangeState = {};
    this.$emit('on-pick', this.data.dates);
    this.handleConfirm();
        //  if (this.showTime) this.$refs.timePicker.handleClear();
  },
  handleConfirm(visible, type) {
    this.$emit('on-pick', this.data.dates, visible, type || this.data.type);
  },
  onToggleVisibility(open) {
    const { timeSpinner, timeSpinnerEnd } = this.$refs;
    if (open && timeSpinner) timeSpinner.updateScroll();
    if (open && timeSpinnerEnd) timeSpinnerEnd.updateScroll();
  },
  handleToggleTime() {
    this.data.currentView = this.data.currentView === 'time' ? 'date' : 'time';
  },

    //

  computed: {
    isTime() {
      return this.data.currentView === 'time';
    },
  },
});

module.exports = KLDatePickerPanel;
