/* eslint-disable */

const Component = require('../../../../../../ui-base/component');
const _ = require('../../../../../../ui-base/_');
const template = require('./index.html');

const KLMonth = require('../../../common/KLMonth/index');

const KLDateRangeMonth = KLMonth.extend({
  name: 'kl-date-range-month',
  template,
  config() {
    _.extend(this.data, {
      monthArr: [
        [{
          month: 0, text: this.$trans('JAN'),
        }, {
          month: 1, text: this.$trans('FEB'),
        }, {
          month: 2, text: this.$trans('MAR'),
        }],
        [{
          month: 3, text: this.$trans('APR'),
        }, {
          month: 4, text: this.$trans('MAY'),
        }, {
          month: 5, text: this.$trans('JUN'),
        }],
        [{
          month: 6, text: this.$trans('JUL'),
        }, {
          month: 7, text: this.$trans('AUG'),
        }, {
          month: 8, text: this.$trans('SEP'),
        }],
        [{
          month: 9, text: this.$trans('OCT'),
        }, {
          month: 10, text: this.$trans('NOV'),
        }, {
          month: 11, text: this.$trans('DEC'),
        }],
      ],
      panelTime: '',
      month: '',
    });
    this.supr();
  },
  init() {
    this.$watch('panelTime', function (value) {
      const time = new Date(this.data.panelTime);
      const year = time.getFullYear();
      const month = time.getMonth();
      this.data.month = month;
      this.data.year = year;
    });
  },
  setMonth(month, e) {
    e.stopPropagation();
    const data = this.data;
    const secondPanelTime = data.secondPanelTime;
    const firstPanelTime = data.firstPanelTime;

    data.panelTime = new Date(this.data.year, month, 1);

    if (data.calendarPosition === 'FRONT') {
      const canOperateMonth = data.panelTime >= this.getPreMonthFirstTime(secondPanelTime);

      if (canOperateMonth) {
        data.secondPanelTime = new Date(this.data.year, month + 1, 1);
      }
    }

    if (data.calendarPosition === 'END') {
      const canOperateMonth = data.panelTime <= this.getNextMonthFirstTime(firstPanelTime);

      if (canOperateMonth) {
        data.firstPanelTime = new Date(this.data.year, month - 1, 1);
      }
    }
    console.log(data.panelTime);
    this.$emit('update', data.panelTime);
  },
  getMonth(date) {
    const time = new Date(date);
    return time.getMonth();
  },
  getPreMonthFirstTime(date) {
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth();

    return new Date(year, month - 1, 1).getTime();
  },
  getNextMonthFirstTime(date) {
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth();

    return new Date(year, month + 1, 1).getTime();
  },
});

module.exports = KLDateRangeMonth;
