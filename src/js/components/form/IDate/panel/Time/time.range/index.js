/* eslint-disable */

import Component from '../../../../../../ui-base/component';
import _ from '../../../../../../ui-base/_';
import template from './index.html';

import TimeSpinner from '../../../base/time.spinner/index';
import Confirm from '../../../base/confirm/index';

import { initTimeDate, formatDateLabels } from '../../../util';


const prefixCls = 'ivu-picker-panel';
const timePrefixCls = 'ivu-time-picker';

const capitalize = str => str[0].toUpperCase() + str.slice(1);


const KLRangeTimePickerPanel = Component.extend({
  name: 'kl-range-time-picker-panel',
  template,
  config() {
    _.extend(this.data, {
      disabledHours: [],
      disabledMinutes: [],
      disabledSeconds: [],
      hideDisabledOptions: false,

      confirm: false,

      steps: [],
      format: 'HH:mm:ss',
      value: true,

      prefixCls,
      timePrefixCls,
      showDate: false,

    });
    this.supr();
  },
  init() {
    this.supr;
    const [dateStart, dateEnd] = this.data.value.slice();

    this.data.dateStart = dateStart || initTimeDate(),
        this.data.dateEnd = dateEnd || initTimeDate();

        // ?? 有问题
    if (this.$parent && this.$parent.name === 'DatePicker') this.data.showDate = true;
  },
  watch: {
    value(dates) {
      const [dateStart, dateEnd] = dates.slice();
      this.data.dateStart = dateStart || initTimeDate();
      this.data.dateEnd = dateEnd || initTimeDate();
    },
  },
  computed: {
    classes() {
      const secondsCls = this.showSeconds ? `${timePrefixCls}-with-seconds` : '';
      return [
        `${prefixCls}-body-wrapper`,
        `${timePrefixCls}-with-range`,
        secondsCls,
      ].join(' ');
    },
    showSeconds() {
      return !(this.data.format || '').match(/mm$/);
    },
    leftDatePanelLabel() {
      return this.panelLabelConfig(this.data.date);
    },
    rightDatePanelLabel() {
      return this.panelLabelConfig(this.data.dateEnd);
    },
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


    //

    // ?????
  panelLabelConfig(date) {
        // const locale = this.t('i.locale');
    const locale = 'zh-CN';
        // const datePanelLabel = this.t('i.datepicker.datePanelLabel');
    const datePanelLabel = '[yyyy年] [m月]';
    const { labels, separator } = formatDateLabels(locale, datePanelLabel, date || initTimeDate());
    return [labels[0].label, separator, labels[1].label].join('');
  },
  handleChange(start, end, emit = true) {
    const dateStart = new Date(this.data.dateStart);
    let dateEnd = new Date(this.data.dateEnd);

        // set dateStart
    Object.keys(start).forEach((type) => {
      dateStart[`set${capitalize(type)}`](start[type]);
    });

        // set dateEnd
    Object.keys(end).forEach((type) => {
      dateEnd[`set${capitalize(type)}`](end[type]);
    });

        // judge endTime > startTime?
    if (dateEnd < dateStart) dateEnd = dateStart;

    if (emit) this.$emit('on-pick', [dateStart, dateEnd], 'time');
  },
  handleStartChange(date) {
    this.handleChange(date, {});
  },
  handleEndChange(date) {
    this.handleChange({}, date);
  },
  updateScroll() {
    this.$refs.timeSpinner.updateScroll();
    this.$refs.timeSpinnerEnd.updateScroll();
  },

  stopPropagation(e) {
    e.stopPropagation();
  },
});

module.exports = KLRangeTimePickerPanel;
