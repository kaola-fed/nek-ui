
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';
// import { range, getDayCountOfMonth, nextDate } from '../../util/index';

// const datesInMonth = (year, month) => {
//   const numOfDays = getDayCountOfMonth(year, month);
//   const firstDay = new Date(year, month, 1);
//   return range(numOfDays).map(n => nextDate(firstDay, n));
// };

const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return (` ${el.className} `).indexOf(` ${cls} `) > -1;
};

const KLMonthTable = Component.extend({
  name: 'month-table',
  template,
  config() {
    _.extend(this.data, {
      date: new Date(),
      value: new Date(),
    });
    this.supr();
  },
  init() {
    this.supr();
  },
  getCellStyle(month) {
    return month;
    // const style = {};
    // const year = this.data.date.getFullYear();
    // const today = new Date();

    // style.disabled = typeof this.data.disabledDate === 'function'
    //   ? datesInMonth(year, month).every(this.data.disabledDate)
    //   : false;
    // style.current = this.data.value.getFullYear() === year && this.data.value.getMonth() === month;
    // style.today = today.getFullYear() === year && today.getMonth() === month;
    // style.default = this.data.defaultValue &&
    //   this.data.defaultValue.getFullYear() === year &&
    //   this.data.defaultValue.getMonth() === month;

    // return style;
  },
  handleMonthTableClick(event) {
    const target = event.target;
    if (target.tagName !== 'A') return;
    if (hasClass(target.parentNode, 'disabled')) return;
    const column = target.parentNode.cellIndex;
    const row = target.parentNode.parentNode.rowIndex;
    const month = (row * 4) + column;

    this.$emit('pick', month);
  },
});

module.exports = KLMonthTable;
