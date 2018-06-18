/* eslint-disable */

const Component = require('../../../../../../ui-base/component');
const _ = require('../../../../../../ui-base/_');
const template = require('./index.html');

const KLYear = require('../../../common/KLYear/index');

const KLDateRangeYear = KLYear.extend({
  name: 'kl-date-range-year',
  template,
  config() {
    _.extend(this.data, {
      panelTime: null,
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
      this.initPanel(this.data.year);
    });
  },
  initPanel(value) {
    this.data.yearArr = [
      [],
      [],
      [],
      [],
    ];
    const firstValue = (parseInt(value / 10) * 10) - 1;
    for (let index = 0; index < 4; index++) {
      for (let index2 = 0; index2 < 3; index2++) {
        this.data.yearArr[index].push(firstValue + (index2 + (index * 3)));
      }
    }
  },
  setYear(year) {
    const data = this.data;
    const secondPanelTime = data.secondPanelTime;
    const firstPanelTime = data.firstPanelTime;

    data.panelTime = new Date(year, this.data.month, 1);

    if (data.calendarPosition === 'FRONT') {
      const canOperateMonth = data.panelTime >= this.getPreMonthFirstTime(secondPanelTime);

      if (canOperateMonth) {
        data.secondPanelTime = new Date(year, this.data.month + 1, 1);
      }
    }

    if (data.calendarPosition === 'END') {
      const canOperateMonth = data.panelTime <= this.getNextMonthFirstTime(firstPanelTime);

      if (canOperateMonth) {
        data.firstPanelTime = new Date(year, this.data.month - 1, 1);
      }
    }
    this.$emit('update', year);
  },
  preYear() {
    const year = this.data.yearArr[0][0];
    this.initPanel(year);
  },
  nextYear() {
    const year = this.data.yearArr[3][2];
    this.initPanel(year);
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

module.exports = KLDateRangeYear;
