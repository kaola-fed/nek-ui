
import Component from '../../../../../ui-base/component';
import _ from '../../../../../ui-base/_';
import template from './index.html';

// import { range, nextDate, getDayCountOfYear } from '../../util/index';

// const datesInYear = (year) => {
//   const numOfDays = getDayCountOfYear(year);
//   const firstDay = new Date(year, 0, 1);
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

const KLYearTable = Component.extend({
  name: 'year-table',
  template,
  config() {
    _.extend(this.data, {
      date: new Date(),
      value: new Date(),
      startYear: 111,
    });
    this.supr();
  },
  init() {
    this.supr();
  },
  getCellStyle() {
    // const style = {};
    // const today = new Date();

    // style.disabled = typeof this.data.disabledDate === 'function'
    //   ? datesInYear(year).every(this.data.disabledDate)
    //   : false;
    // style.current = this.data.value.getFullYear() === year;
    // style.today = today.getFullYear() === year;
    // style.default = this.data.defaultValue && this.data.defaultValue.getFullYear() === year;

    // return style;
  },

  handleYearTableClick(event) {
    const target = event.target;
    if (target.tagName === 'A') {
      if (hasClass(target.parentNode, 'disabled')) return;
      const year = target.textContent || target.innerText;
      this.$emit('pick', Number(year));
    }
  },
});

module.exports = KLYearTable;
