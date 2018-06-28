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
  name: 'kl-date-normal',
  template,
  config() {
    _.extend(this.data, {
      firstSelectValue: null,
      secondSelectValue: null,
      value: null,
      startTime: null,
      endTime: null,
      appendToBody: false,
      placement: 'top-right',
      isShow: false,
    });
    this.initPanel();
    this.supr();
  },
  toggle() {
    this.initPanel();
  },
  /**
   * 初始化面板
   */
  initPanel() {
    const data = this.data;
    const value = data.value;
    let date;
    if (value === null || value === undefined) {
      date = new Date();
    } else {
      date = new Date(value);
    }
    const year = date.getFullYear();
    const month = date.getMonth();

    data.panelTime = this.getFirstDay(date, 'now');
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
    data.value = e;
    this.data.isShow = false;
  },
  changeYear() {
    this.data.isChangeYear = true;
  },
  updateYear(panelTime) {
    this.data.panelTime = panelTime;
    this.data.isChangeYear = false;
  },
  changeMonth() {
    this.data.isChangeMonth = true;
  },
  updateMonth(panelTime) {
    this.data.panelTime = panelTime;
    this.data.isChangeMonth = false;
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
