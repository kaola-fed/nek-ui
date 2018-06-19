/* eslint-disable */
/**
 * 面板时间都是通过panelTime(每个月的第一天)初始化得到
 */
const validator = require('validator');
const bowser = require('bowser');
const Component = require('../../../../../../ui-base/component');
const _ = require('../../../../../../ui-base/_');
const template = require('./index.html');
const KLMonth = require('../KLMonth/index');
const KLYear = require('../KLYear/index');
const KLCalendar = require('../../../common/KLCalendar/index');

const MS_OF_DAY = 24 * 3600 * 1000;
const MS_OF_7DAY = 7 * 24 * 3600 * 1000;

const KLDateRangeCalendar = KLCalendar.extend({
  name: 'kl-date-normal-calendar',
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
      startTime: null,               // 开始时间
      endTime: null,                 // 结束时间
      firstPanelTime: null,          // 前一个日历面板的时间
      secondPanelTime: null,         // 后一个日历面板的时间
      panelTime: this.getNowTime(),  // 面板上当月的第一天
      type: 'daterange',
    });
    this.supr();

    this.$watch('panelTime', function (value) {
      this.resetPanel(this.data.panelTime);
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

    this.data.month = month;
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
  resetDate(isUpdate) {
    const data = this.data;

    // 如果前一个面板的时间再后一个面板之后，更新面板时间
    const secondPanelTime = this.data.secondPanelTime;
    const firstPanelTime = this.data.firstPanelTime;

    if (data.calendarPosition === 'FRONT' && isUpdate === true) {
      const canOperateMonth = data.panelTime >= this.getPreMonthFirstTime(secondPanelTime);

      if (canOperateMonth) {
        data.secondPanelTime = new Date(this.data.year, this.data.month + 1, 1);
      }
    }

    if (data.calendarPosition === 'END' && isUpdate === true) {
      const canOperateMonth = data.panelTime <= this.getNextMonthFirstTime(firstPanelTime);
      // const canOperateYear = this.getYear(data.panelTime) === this.getYear(firstPanelTime);

      if (canOperateMonth) {
        data.firstPanelTime = new Date(this.data.year, this.data.month - 1, 1);
      }
    }

    const newDate = new Date(this.data.year, this.data.month, 1);
    data.panelTime = newDate.getTime();

    this.resetPanel(newDate);
  },
    /**
     * 日期选择成功
     */
  select(date, e) {
    e.stopPropagation();
    const data = this.data;
    if ((data.minDate !== null && date < data.minDate) || (data.maxDate !== null && date > data.maxDate)) {
      return;
    }
    this.data.value = date;
    this.data.year = new Date(date).getFullYear()
    this.data.month = new Date(date).getMonth()
    this.resetDate();
    this.$emit('select', date);
  },
  changeMonth() {
    this.data.isChangeMonth = true;
    this.$emit('changeMonth');
    this.resetDate();
  },
  changeYear() {
    this.data.isChangeYear = true;
    this.$emit('changeYear');
    this.resetDate();
  },
  preYear() {
    this.data.year--;
    if (this.data.calendarPosition === 'END') {
      this.resetDate(true);
    } else {
      this.resetDate();
    }
  },
  preMonth() {
    const data = this.data;
    data.month--;
    if (data.month < 0) {
      data.month = 11;
      data.year--;
    }

    if (this.data.calendarPosition === 'END') {
      this.resetDate(true);
    } else {
      this.resetDate();
    }
  },
  nextYear() {
    this.data.year++;
    this.resetDate();
    if (this.data.calendarPosition === 'FRONT') {
      this.resetDate(true);
    } else {
      this.resetDate();
    }
  },
  nextMonth() {
    const data = this.data;
    data.month++;
    if (data.month > 11) {
      data.month = 0;
      data.year++;
    }

    if (this.data.calendarPosition === 'FRONT') {
      this.resetDate(true);
    } else {
      this.resetDate();
    }
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
    // const newDate = new Date(this.data.year, e - 1, 1);
    // this.data.panelTime = newDate.getTime();
    // this.resetPanel(newDate);
    this.data.isChangeMonth = false;
  },
  onMouseOver(e, rangeEndTime) {
    this.$emit('mouseover', e);

    if (!!this.data.startTime || !!this.data.endTime) {
      this.data.rangeEndTime = rangeEndTime;
    }
  },
});

module.exports = KLDateRangeCalendar;
