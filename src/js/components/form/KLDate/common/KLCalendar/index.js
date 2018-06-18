/* eslint-disable */

const validator = require('validator');
const bowser = require('bowser');
const Component = require('../../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../../ui-base/_');

const KLTime = require('../KLTime/index');
const KLMonth = require('../KLMonth/index');
const KLYear = require('../KLYear/index');

const MS_OF_DAY = 24 * 3600 * 1000;
const MS_OF_7DAY = 7 * 24 * 3600 * 1000;

const KLCalendar = Component.extend({
  name: 'kl-calendar',
  template,
  config() {
    _.extend(this.data, {
      weekArr: ['日', '一', '二', '三', '四', '五', '六'],
      dayArr: [],
      year: '',
      month: '',
      calendarPosition: 'MIDDLE',
      isChangeMonth: false,
      isChangeYear: false,
      value: null,
      minDate: null,
      maxDate: null,
      startTime: null,
      endTime: null,
      canOperateYear: true,
      canOperateMonth: true,
      firstPanelTime: null,
      secondPanelTime: null,
      panelTime: this.getNowTime(),  // 面板上当月的第一天
      type: 'daterange',
    });
    this.supr();

    this.$watch('panelTime', function (value) {
      this.canOperate();
    });
  },
  init() {
    const panelTime = this.data.panelTime;
    this.resetPanel(panelTime);
  },
    /**
     * 重置面板时间
     */
  resetPanel(date) {
    const dayArr = [];
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth();
    const firstDay = new Date(year, month, 1);
    const extraDay = firstDay.getDay();
    const now = this.getNowTime();

    this.data.month = month + 1;
    this.data.year = year;

    for (let i = 0; i <= 5; i++) {
      const arr = [];
      for (let j = 0; j <= 6; j++) {
        const time = new Date(year, month, 1).getTime() + (j - extraDay) * MS_OF_DAY + MS_OF_7DAY * i;
        let type;
        if (time < new Date(year, month, 1).getTime()) {
          type = 'lastmonth';
        } else if (time > new Date(year, month + 1, 0).getTime()) {
          type = 'nextmonth';
        } else if (time == now) {
          type = 'today';
        } else {
          type = 'normal';
        }
        const obj = {
          date: time,
          type,
          day: new Date(time).getDate(),
        };
        arr.push(obj);
      }
      dayArr[i] = arr;
    }

    this.data.dayArr = dayArr;
  },
  resetDate() {
    const newDate = new Date(this.data.year, this.data.month - 1, 1);
    this.data.panelTime = newDate.getTime();

    this.canOperate();

    this.resetPanel(newDate);
  },
  /**
   * 日期范围选择的时候控制上方操作区
   */
  canOperate() {
    if (this.data.type !== 'daterange') {
      return;
    }
    const data = this.data;
    const secondPanelTime = this.data.secondPanelTime;
    const firstPanelTime = this.data.firstPanelTime;

    if (data.calendarPosition === 'FRONT') {
      data.canOperateMonth = data.panelTime < this.getPreMonthFirstTime(secondPanelTime);
      data.canOperateYear = this.getYear(data.panelTime) < this.getYear(secondPanelTime);
    }

    if (data.calendarPosition === 'END') {
      data.canOperateMonth = data.panelTime > this.getNextMonthFirstTime(firstPanelTime);
      data.canOperateYear = this.getYear(data.panelTime) > this.getYear(firstPanelTime);
    }
  },
    /**
     * 日期选择成功
     */
  select(date) {
    const data = this.data;
    if ((data.minDate !== null && date < data.minDate) || (data.maxDate !== null && date > data.maxDate)) {
      return;
    }

    data.value = date;
    this.$emit('select', date);
  },
  changeMonth() {
    this.data.isChangeMonth = true;
    this.resetDate();
  },
  changeYear() {
    this.data.isChangeYear = true;
    this.resetDate();
  },
  preYear() {
    this.data.year--;
    this.resetDate();
  },
  preMonth() {
    const data = this.data;
    data.month--;
    if (data.month < 1) {
      data.month = 12;
      data.year--;
    }

    this.resetDate();
  },
  nextYear() {
    this.data.year++;
    this.resetDate();
  },
  nextMonth() {
    const data = this.data;
    data.month++;
    if (data.month > 12) {
      data.month = 1;
      data.year++;
    }

    this.resetDate();
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
  getYear(date) {
    const time = new Date(date);
    const year = time.getFullYear();

    return year;
  },
  getNowTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return new Date(year, month, day).getTime();
  },
  updateMonth(e) {
    const newDate = new Date(this.data.year, e - 1, 1);
    this.data.panelTime = newDate.getTime();
    this.resetPanel(newDate);
    this.data.isChangeMonth = false;
  },
  onMouseOver(e, rangeEndTime) {
    this.$emit('mouseover', e);

    if (!!this.data.startTime && !!this.data.endTime || this.data.type !== 'daterange') {
      this.data.rangeEndTime = undefined;
      return;
    }

    if (this.data.type === 'daterange' && (!!this.data.startTime || !!this.data.endTime)) {
      this.data.rangeEndTime = rangeEndTime;
    }
  },
});

module.exports = KLCalendar;
