/* eslint-disable */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');
const KLCalendar = require('./modules/KLCalendar/index');
const KLMonth = require('./modules/KLMonth/index');
const KLYear = require('./modules/KLYear/index');
const KLTime = require('./modules/KLTime/index');

const KLDateRange = Component.extend({
  name: 'kl-date-range',
  template,
  config() {
    _.extend(this.data, {
      firstSelectValue: null,
      secondSelectValue: null,
      startTime: null,
      endTime: null,
    });
    this.initPanel();
    this.supr();
  },
    /**
     * 初始化面板
     */
  initPanel() {
    const data = this.data;
    const startTime = data.startTime;
    const endTime = data.endTime;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    if (startTime === null && endTime === null) {
      data.firstPanelTime = this.getFirstDay(date, 'now');
      data.secondPanelTime = this.getFirstDay(date, 'next');
    } else if (startTime !== null && endTime === null) {
      data.firstPanelTime = this.getFirstDay(startTime, 'now');
      data.secondPanelTime = this.getFirstDay(date, 'next');
    } else if (startTime === null && endTime !== null) {
      data.firstPanelTime = this.getFirstDay(endTime, 'pre');
      data.secondPanelTime = this.getFirstDay(endTime, 'now');
    } else {
      data.firstPanelTime = this.getFirstDay(startTime, 'now');
      data.secondPanelTime = this.getFirstDay(endTime, 'now');
    }
  },
  getFirstDay(time, type) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    let monthFirstDay;
    if (type === 'pre') {
      monthFirstDay = new Date(year, month - 1, 1).getTime();
    } else if (type === 'next') {
      monthFirstDay = new Date(year, month + 1, 1).getTime();
    } else if (type === 'now') {
      monthFirstDay = new Date(year, month, 1).getTime();
    }
    return monthFirstDay;
  },
  assign() {
    const data = this.data;
    const firstSelectValue = data.firstSelectValue;
    const secondSelectValue = data.secondSelectValue;

    if (firstSelectValue <= secondSelectValue) {
      data.startTime = firstSelectValue;
      data.endTime = secondSelectValue;
    } else {
      data.startTime = secondSelectValue;
      data.endTime = firstSelectValue;
    }
  },
  select(e) {
    const data = this.data;
    if (data.firstSelectValue === null) {
      data.firstSelectValue = e;
      data.startTime = e;
    } else if (data.secondSelectValue === null) {
      data.secondSelectValue = e;
      this.assign();
    } else {
      data.firstSelectValue = e;
      data.secondSelectValue = null;

      data.startTime = e;
      data.endTime = null;
    }
  },
});

module.exports = KLDateRange;
