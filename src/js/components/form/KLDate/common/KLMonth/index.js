/* eslint-disable */
const Component = require('../../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../../ui-base/_');

const KLMonth = Component.extend({
  name: 'kl-month',
  template,
  config() {
    _.extend(this.data, {
      monthArr: [
        [{
          month: 1, text: this.$trans('JAN'),
        }, {
          month: 2, text: this.$trans('FEB'),
        }, {
          month: 3, text: this.$trans('MAR'),
        }],
        [{
          month: 4, text: this.$trans('APR'),
        }, {
          month: 5, text: this.$trans('MAY'),
        }, {
          month: 6, text: this.$trans('JUN'),
        }],
        [{
          month: 7, text: this.$trans('JUL'),
        }, {
          month: 8, text: this.$trans('AUG'),
        }, {
          month: 9, text: this.$trans('SEP'),
        }],
        [{
          month: 10, text: this.$trans('OCT'),
        }, {
          month: 11, text: this.$trans('NOV'),
        }, {
          month: 12, text: this.$trans('DEC'),
        }],
      ],
      value: '',
    });
    this.supr();
  },
  setMonth(month) {
    const calendarPosition = this.data.calendarPosition;
    const canOperateMonth = this.data.canOperateMonth;
    const value = this.data.value;
    if ((calendarPosition === 'FRONT' && canOperateMonth === false && month > value)
        || (calendarPosition === 'END' && canOperateMonth === false && month < value)) {
      return;
    }

    this.data.value = month;
    this.$emit('update', month);
  },
  isDisabled(item) {
    const data = this.data;
    const calendarPosition = data.calendarPosition;
    const secondPanelTime = data.secondPanelTime;
    const firstPanelTime = data.firstPanelTime;
    const condition1 = calendarPosition === 'FRONT' && item.month > this.getMonth(secondPanelTime);
    const condition2 = calendarPosition === 'END' && item.month < this.getMonth(firstPanelTime);
    console.log(`${calendarPosition},${condition1},${condition2},${this.getMonth(secondPanelTime)},${this.getMonth(firstPanelTime)}`);
    return condition1 || condition2;
  },
  getMonth(date) {
    const time = new Date(date);
    return time.getMonth();
  },
});

module.exports = KLMonth;
