/* eslint-disable */

/* eslint no-unused-vars: 0 */
import moment from 'moment';
import KLDrop from '../../../layout/KLDrop/index';
import KLDropHeader from '../../../layout/KLDrop/KLDropHeader/index';
import KLDropMenu from '../../../layout/KLDrop/KLDropMenu/index';

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

  restPanelTime() {
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



  changeFrontYear() {
    this.data.isFrontChangeYear = true;
  },
  updateFrontYear(panelTime) {
    const data = this.data;
    data.firstPanelTime = panelTime;

    const canOperateMonth = data.firstPanelTime >= this.getPreMonthFirstTime(data.secondPanelTime);
    if (canOperateMonth) {
      const year = new Date(data.firstPanelTime).getFullYear();
      const month = new Date(data.firstPanelTime).getMonth();
      data.secondPanelTime = new Date(year, month + 1, 1);
    }

    this.data.isFrontChangeYear = false;
  },

  changeFrontMonth() {
    this.data.isFrontChangeMonth = true;
  },
  updateFrontMonth(panelTime) {
    const data = this.data;
    data.firstPanelTime = panelTime;

    const canOperateMonth = data.firstPanelTime >= this.getPreMonthFirstTime(data.secondPanelTime);
    if (canOperateMonth) {
      const year = new Date(data.firstPanelTime).getFullYear();
      const month = new Date(data.firstPanelTime).getMonth();
      data.secondPanelTime = new Date(year, month + 1, 1);
    }

    this.data.isFrontChangeMonth = false;
  },

  changeBackYear() {
    this.data.isBackChangeYear = true;
  },
  updateBackYear(panelTime) {
    const data = this.data;
    data.secondPanelTime = panelTime;

    const canOperateMonth = data.secondPanelTime <= this.getNextMonthFirstTime(data.firstPanelTime);

    if (canOperateMonth) {
      const year = new Date(data.secondPanelTime).getFullYear();
      const month = new Date(data.secondPanelTime).getMonth();
      data.firstPanelTime = new Date(year, month - 1, 1);
    }
    this.data.isBackChangeYear = false;
  },

  changeBackMonth() {
    this.data.isBackChangeMonth = true;
  },
  updateBackMonth(panelTime) {
    const data = this.data;
    data.secondPanelTime = panelTime;

    const canOperateMonth = data.secondPanelTime <= this.getNextMonthFirstTime(data.firstPanelTime);
    if (canOperateMonth) {
      const year = new Date(data.secondPanelTime).getFullYear();
      const month = new Date(data.secondPanelTime).getMonth();
      data.firstPanelTime = new Date(year, month - 1, 1);
    }
    this.data.isBackChangeMonth = false;
  },
}).filter({
  format(value, type) {
    if(!value){
      return null;
    }

    let newValue = moment(value).isValid();
    if (!newValue) {
        return;
    }
    if (!type) {
        type = 'YYYY-MM-DD';
    }
    return moment(value).format(type);
  }
});

module.exports = KLDateRange;
